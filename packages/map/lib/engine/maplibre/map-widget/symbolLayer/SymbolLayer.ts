/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2024/1/11
 * @Last Modified by:
 * @Last Modified time: 2024/1/11 14:34
 */

import type { Points } from '../../../../widget/symbolLayer/SymbolLayerInterface'
import { SymbolLayerInterface } from '../../../../widget/symbolLayer/SymbolLayerInterface'
import type { GeoJSON as GeoJSONType } from 'geojson'
import type { LngLat, Map } from 'maplibre-gl'

export class MaplibreSymbolLayer extends SymbolLayerInterface<Map, LngLat> {
    private source

    setup() {
        const map = this.map
        const url = this.options.url
        map.addLayer({
            id: this.options.id,
            layout: {
                'icon-allow-overlap': true, // 允许图标重叠
                'icon-anchor': this.options.anchor || 'center',
                'icon-ignore-placement': true, // 忽略图标布局
                'icon-image': 'symbolIcon',
                'icon-overlap': 'always',
                'icon-size': this.options.scale || 1,
            },
            source: { data: { features: [], type: 'FeatureCollection' }, type: 'geojson' },
            type: 'symbol',
        })

        this.pointLayer = map.getLayer(this.options.id)
        this.source = map.getSource(this.options.id)

        map.on(
            'mouseenter',
            'symbols',
            () => {
                map.getCanvas().style.cursor = 'pointer'
            },
        )
        map.on(
            'mouseleave',
            this.options.id,
            () => {
                map.getCanvas().style.cursor = ''
            },
        )

        map.loadImage(url, (err, image) => {
            if (image) {
                map.addImage('symbolIcon', image)
                this.bringToFront()
            }
        })
    }

    getLayer() {
        return this.pointLayer
    }

    addPoint(
        id: string,
        coordinate: LngLat,
        properties,
    ) {
        const data = this.source._data
        data.features.push(this.getGeoJson(
            id,
            [coordinate.lng, coordinate.lat],
            properties,
        ))
        this.setData(data)
    }

    addPoints(points: Points) {
        const data = this.source._data
        points.forEach((i) => {
            data.features.push(this.getGeoJson(
                i.id,
                i.coordinates,
                i.properties,
            ))
        })
        this.setData(data)
    }

    removePoint(id: string) {
        const data = this.source._data
        data.features = data.features.filter(i => i.properties.id !== id)
        this.setData(data)
    }

    removeAllPoints() {
        const data = this.source._data
        data.features = []
        this.setData(data)
    }

    addFeature(feature: GeoJSONType) {
        const data = this.source._data
        data.features.push(feature)
        this.setData(data)
    }

    addFeatures(features) {
        this.setSource()
        const data = this.source._data
        if (features.type === 'Feature')
            features = [features]
        else if (features.type === 'FeatureCollection')
            features = features.features

        features.forEach((i) => {
            data.features.push(i)
        })
        this.setData(data)
    }

    bringToFront() {
        console.log('功能暂不可用')
    }

    bringToBack() {
        console.log('功能暂不可用')
    }

    setZIndex(zIndex: number) {
        console.log('功能暂不可用')
    }

    bindClick(callback) {
        this.clickCallback = callback
        this.map.on(
            'click',
            this.options.id,
            (e) => {
                const features = this.map.queryRenderedFeatures(e.point, { layers: [this.options.id], // 替换为你的图层名称
                })
                features.forEach((i) => {
                    callback(i)
                })
            },
        )
    }

    removeClick() {
        this.map.off(
            'click',
            this.options.id,
            (e) => {
                const features = this.map.queryRenderedFeatures(e.point, { layers: [this.options.id], // 替换为你的图层名称
                })
                features.forEach((i) => {
                    this.clickCallback(i)
                })
            },
        )
        this.clickCallback = undefined
    }

    /**
     * 更新图层数据。
     *
     * @param {type} data - 要设置的数据。
     * @return {void} - 无返回值。
     */
    private setData(data) {
        this.source.setData(data)
    }

    /**
     * 获取图层源数据。
     *
     * @return {void} - 无返回值。
     */
    private setSource() {
        if (!this.source)
            this.source = this.map.getSource(this.options.id)
    }

    /**
     * 使用给定的id、坐标和属性生成一个 GeoJSON 特征对象。
     *
     * @param {string} id - 特征的标识符。
     * @param {number[]} coordinates - 点特征的坐标。
     * @param {object} properties - 与特征相关联的属性。
     * @return {object} GeoJSON 特征对象。
     */
    private getGeoJson(
        id: string,
        coordinates: number[],
        properties,
    ) {
        return {
            geometry: { coordinates, type: 'Point' },
            id,
            properties,
            type: 'Feature',
        }
    }
}
