/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2024/1/12
 * @Last Modified by:
 * @Last Modified time: 2024/1/12 14:13
 */

import { getTypeOfMapInstance } from '../../../util/checkTypeOfMapInstance'
import { isCustomMapLibre } from '../../../util/isCustomMapLibre'
import { MaplibreSymbolLayer } from '../../engine/maplibre/map-widget/symbolLayer/SymbolLayer'
import { OpenlayersSymbolLayer } from '../../engine/openlayer/map-widget/symbolLayer/SymbolLayer'
import type { Options, Points } from './SymbolLayerInterface'

export class SymbolLayer {
    private layer!: OpenlayersSymbolLayer | MaplibreSymbolLayer

    constructor(private map, private options: Options) {
        if (getTypeOfMapInstance(map) === 'unknown') {
            throw new Error('未知的地图类型, 请检查构造器传入参数是否正确')
        }
        else {
            this.layer = isCustomMapLibre(map)
                ? new MaplibreSymbolLayer(map.instance, this.options)
                : new OpenlayersSymbolLayer(map.instance, this.options)
        }
    }

    /**
     * 获取图层。
     *
     * @return {type} 图层。
     */
    getLayer() {
        return this.layer.getLayer()
    }

    /**
     * 向图层中添加点要素
     *
     * @param {string} id - 点的 ID。
     * @param {number[]} coordinate - 点的坐标。
     * @param {any} properties - 点的附加属性。
     */
    addPoint(
        id: string,
        coordinate,
        properties,
    ) {
        this.layer.addPoint(
            id,
            coordinate,
            properties,
        )
    }

    /**
     * 向图层中添加多个点。
     *
     * @param {Points} points - 要添加点的集合。
     */
    addPoints(points: Points) {
        this.layer.addPoints(points)
    }

    /**
     * 向图层中添加点要素，使用 GeoJSON 格式
     *
     * @param {any} feature - 要添加的点要素。
     */
    addFeature(feature) {
        this.layer.addFeature(feature)
    }

    /**
     * 向图层中添加多个点要素，使用 GeoJSON 格式
     *
     * @param {any} feature - 要添加的点要素。
     */
    addFeatures(features) {
        this.layer.addFeatures(features)
    }

    /**
     * 删除对应 ID 的点要素。
     *
     * @param {string} id - 要删除的点的 ID。
     */
    removePoint(id: string) {
        this.layer.removePoint(id)
    }

    /**
     * 从图层中移除所有点。
     *
     * @return {void}
     */
    removeAllPoints() {
        this.layer.removeAllPoints()
    }

    /**
     * 将当前图层置于最前面。
     *
     * @return {void} 此函数不返回任何值。
     */
    bringToFront() {
        this.layer.bringToFront()
    }

    /**
     * 将点图层置于最底层。
     *
     * @return {void} 此函数不返回任何值。
     */
    bringToBack() {
        this.layer.bringToBack()
    }

    /**
     * 设置图层的 zIndex。
     *
     * @param {number} zIndex - 层级值
     * @return {void} 此函数不返回任何值。
     */
    setZIndex(zIndex: number) {
        this.layer.setZIndex(zIndex)
    }

    /**
     * 绑定点击事件到图层，并在点击时执行提供的回调函数。
     *
     * @param {Function} callback - 点击时要执行的函数。
     */
    bindClick(callback) {
        this.layer.bindClick(callback)
    }

    /**
     * 从图层中移除点击事件。
     *
     * @return {void}
     */
    removeClick() {
        this.layer.removeClick()
    }
}
