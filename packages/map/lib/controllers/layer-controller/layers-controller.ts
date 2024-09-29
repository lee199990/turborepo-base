/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 12:00
 */

import { ControllerAdapter } from '../base'
import type { LayersOperations, Parser } from './layers-operations'
import {
    createLayerOption,
    getLayerStyle,
    mergeLayerMeta,
} from './layers-util'
import type { LocalGeoJsonLayerOption } from './services/local-geojson'
import type { TmsLayerOption } from './services/tms'
import { getMetadata } from './services/utils'
import type {
    WMSLayerMetadata,
    WMSMetadata,
    WmsLayerOption,
} from './services/wms'
import type { WMTSLayerMetadata, WmtsLayerOption } from './services/wmts'
import type { GroupOption } from './type'
import {
    LayerFormat,
    LayerServerType,
    VectorType,
} from './type'

export abstract class LayersControllerAdapter<
    M,
    T extends LayersOperations = LayersOperations,
    G extends GroupOption = GroupOption,
> extends ControllerAdapter<M> {
    // 需要实现的各个服务解析器
    protected abstract parsers: { [key in LayerServerType]: Parser<T> }

    // 已经添加的图层列表
    layers = new Map<string, T>()

    /**
     * 为给定的分组选项创建WMS图层。
     *
     * @param {G extends GroupOption} groupOption - 创建WMS图层的分组选项。
     * @return {Promise<string[]>} - 一个解析为图层名称数组的Promise。
     */
    private async createWmsLayers(groupOption: G): Promise<string[]> {
        const {
            format,
            groupId,
            merge,
            url,
        } = groupOption
        const { EX_GeographicBoundingBox: allBounds, Layer: layerMetas }
            = await getMetadata<WMSMetadata>(
                url,
                LayerServerType.Wms,
                obj => obj.Capability.Layer,
            )
        const viewItems = getLayerStyle(groupOption)
        const toBeCreate = mergeLayerMeta<WMSLayerMetadata>(
            layerMetas,
            'Name',
            viewItems,
        )
        // 如果合并图层，将请求wms合并后的图片
        if (merge) {
            console.log('即将创建合并的图层')
            const layerNames = toBeCreate.map(({ name }) => name)
            this.addLayer(LayerServerType.Wms, {
                ...createLayerOption(groupOption),
                bounds: allBounds,
                format,
                id: `${groupId}:merge-all`,
                layer: layerNames.join(','),
                subdomains: groupOption.subdomains,
                vectorType: viewItems[0].type,
            }).addTo()
            return layerNames
        }
        return toBeCreate.map(({
            meta,
            name,
            type = VectorType.Line,
        }) => {
            this.addLayer(LayerServerType.Wms, {
                ...createLayerOption(groupOption),
                bounds: meta.EX_GeographicBoundingBox,
                format,
                id: name,
                layer: name,
                subdomains: groupOption.subdomains,
                vectorType: type,
            }).addTo()
            return name
        })
    }

    /**
     * 为给定的分组选项创建WMTS图层。
     *
     * @param {G extends GroupOption} groupOption - 创建WMS图层的分组选项。
     * @return {Promise<string[]>} - 一个解析为图层名称数组的Promise。
     */
    private async createWmtsLayers(groupOption: G): Promise<string[]> {
        const { format = LayerFormat.Png, url } = groupOption
        const metadata = await getMetadata(url, LayerServerType.Wmts)
        const toBeCreate = mergeLayerMeta<WMTSLayerMetadata>(
            metadata.Contents.Layer,
            'Identifier',
            getLayerStyle(groupOption),
        )
        return toBeCreate.map(({
            meta,
            name,
            type,
        }) => {
            this.addLayer(LayerServerType.Wmts, {
                ...createLayerOption(groupOption),
                bounds: meta.WGS84BoundingBox,
                format,
                id: name,
                layer: name,
                style: groupOption.style,
                url,
                vectorType: type,
            }).addTo()
            return name
        })
    }

    /**
     * 从指定服务的元数据中添加图层组。
     * 从元数据中过滤出指定的layers, ID将以layer name命名
     * 如果layers为空，则会渲染链接下所有有效的图层，警告：慎用此方式，我们无法确定哪些图层是有效的，也无法确定渲染方式是否合适
     * @param {LayerServerType} type - 图层服务的类型。
     * @param {G extends GroupOption} options - 创建图层的选项。
     * @return {Promise<string[]>} 一个解析为图层名称数组的Promise。
     */
    addLayersFromMetadata(type: LayerServerType, options: G): Promise<string[]> {
        switch (type) {
            case LayerServerType.Wms:
                return this.createWmsLayers(options)

            case LayerServerType.Wmts:
                return this.createWmtsLayers(options)

            default: {
                return Promise.resolve([])
            }
        }
    }

    /**
     * 添加一个具有给定选项的 Wms 类型的图层。
     *
     * @param {LayerServerType.Wms} type - 要添加的图层的类型。
     * @param {WmsLayerOption} options - 图层的选项。
     * @return {T extends LayersOperations} - 添加的图层。
     */
    addLayer(type: LayerServerType.Wms, options: WmsLayerOption): T

    /**
     * 添加一个具有给定选项的 Wmts 类型的图层。
     * 如果需要批量添加推荐使用addLayersFromMetadata，将从元数据自动设置
     * @param {LayerServerType} type - 要添加的图层类型。
     * @param {WmtsLayerOption} options - 图层的选项。
     * @return {T extends LayersOperations} - 添加的图层。
     */
    addLayer(type: LayerServerType.Wmts, options: WmtsLayerOption): T

    /**
     * 添加一个具有给定选项的 Tms 类型的图层。
     * 如果添加的是公共服务如天地图，这类不统一的url，不需要填写layer,自行构造url
     * @template 以geoserver为例，url只需要写到work即可 如'/geoserver/gwc/service/tms/1.0.0/work_name'
     * @param {LayerServerType.Tms} type - 添加的图层类型。
     * @param {TmsLayerOption} options - 图层的选项。
     * @return {T extends LayersOperations} - 添加的图层。
     */
    addLayer(type: LayerServerType.Tms, options: TmsLayerOption): T

    addLayer(type: LayerServerType.LocalGeoJSON, options: LocalGeoJsonLayerOption): T

    addLayer(type: LayerServerType, options): T {
        if (this.parsers[type] === undefined)
            throw new Error(`暂不支持${type}图层`)

        const layer = new this.parsers[type](this.mapInstance, options)
        layer.create()
        layer.beforeRemove(() => this.layers.delete(layer.id))
        this.layers.set(layer.id, layer)
        return layer
    }

    /**
     * 显示指定ID的图层。
     *
     * @param {string} id - 要显示的图层的ID。
     */
    show(id: string) {
        this.layers.get(id)?.show()
    }

    /**
     * 显示指定ID的图层。其他全部隐藏
     *
     * @param {string} id - 要显示的图层的ID。
     */
    separatelyShow(id: string) {
        this.layers.forEach((layer) => {
            if (layer.id === id)
                layer.show()
            else
                layer.hide()
        })
    }

    /**
     * 根据id批量显示图层。
     *
     * @param {string[]} ids - 图层id的数组。
     * @param {boolean} show - 一个布尔标志，表示是显示还是隐藏图层。
     */
    batchDisplay(ids: string[], show: boolean) {
        this.layers.forEach((layer) => {
            const shouldShow = ids.includes(layer.id) ? show : !show
            if (shouldShow)
                layer.show()
            else
                layer.hide()
        })
    }

    /**
     * 隐藏指定ID的图层。
     *
     * @param {string} id - 要隐藏的图层的ID。
     */
    hide(id: string) {
        this.layers.get(id)?.hide()
    }

    /**
     * 从地图中移除指定ID的图层。
     *
     * @param {string} id - 要移除的图层的ID。
     */
    remove(id: string) {
        this.layers.get(id)?.remove()
    }

    /**
     * 通过groupId获取图层组
     *
     * @param {string} groupId - 群组ID
     */
    getLayerGroup(groupId: string) {
        const group: T[] = []
        this.layers.forEach((layer) => {
            if (layer.groupId === groupId)
                group.push(layer)
        })

        return group
    }

    /**
     * 获取图层
     * @param {string} id  - 添加时的图层ID
     */
    getLayer(id: string) {
        return this.layers.get(id)
    }

    // 创建一个空的矢量图层
    abstract emptyVector(id: string)
}
