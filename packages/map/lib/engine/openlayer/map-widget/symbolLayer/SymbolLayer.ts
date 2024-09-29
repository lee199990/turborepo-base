/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2024/1/10
 * @Last Modified by:
 * @Last Modified time: 2024/1/10 19:47
 */

import type { Points } from '../../../../widget/symbolLayer/SymbolLayerInterface'
import { SymbolLayerInterface } from '../../../../widget/symbolLayer/SymbolLayerInterface'
import type { GeoJSON as GeoJSONType } from 'geojson'
import type { Feature, Map } from 'ol'
import type { Coordinate } from 'ol/coordinate'
import { GeoJSON } from 'ol/format'
import type { Geometry } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Icon, Style } from 'ol/style'

const targetAnchor = {
    'bottom': [0.5, 1],
    'bottom-left': [0, 1],
    'bottom-right': [1, 1],
    'center': [0.5, 0.5],
    'left': [0, 0.5],
    'right': [1, 0.5],
    'top': [0.5, 0],
    'top-left': [0, 0],
    'top-right': [1, 0],
}

export class OpenlayersSymbolLayer extends SymbolLayerInterface<Map, Coordinate> {
    setup() {
        const map = this.map
        const url = this.options.url

        this.pointLayer = new VectorLayer({ source: new VectorSource() })
        this.pointLayer.set('id', this.options.id)
        map.addLayer(this.pointLayer)
        map.on('pointermove', (e) => {
            const pixel = this.map.getEventPixel(e.originalEvent)
            const hit = this.map.hasFeatureAtPixel(pixel)
            this.map.getViewport().style.cursor = hit ? 'pointer' : ''
        })

        const img = new Image()
        img.src = url
        img.onload = () => {
            const pointStyle = new Style({ image: new Icon({
                anchor: this.options.anchor ? targetAnchor[this.options.anchor] : [0.5, 0.5],
                img,
                scale: this.options.scale || 1,
            }) })
            this.pointLayer.setStyle(pointStyle)
            this.bringToFront()
        }
    }

    getLayer(): VectorLayer<VectorSource> {
        return this.pointLayer
    }

    addPoint(
        id: string,
        coordinate: Coordinate | number[],
        properties,
    ) {
        const feature = {
            geometry: { coordinates: coordinate, type: 'Point' },
            id,
            properties,
            type: 'Feature',
        }
        const point = new GeoJSON().readFeature(feature) as Feature<Geometry>
        this.pointLayer.getSource()?.addFeature(point)
    }

    addPoints(points: Points) {
        points.forEach((i) => {
            const feature = {
                geometry: { coordinates: i.coordinates, type: 'Point' },
                id: i.id,
                properties: i.properties,
                type: 'Feature',
            }
            const point = new GeoJSON().readFeature(feature) as Feature<Geometry>
            this.pointLayer.getSource()?.addFeature(point)
        })
    }

    removePoint(id: string) {
        const features = this.pointLayer.getSource()?.getFeatures()
        const item = features.find(i => i.getProperties().id === id)
        // const item = this.pointLayer.getSource()?.getFeatureById(id);
        if (item)
            this.pointLayer.getSource()?.removeFeature(item as Feature<Geometry>)
    }

    removeAllPoints() {
        this.pointLayer.getSource()?.clear()
    }

    addFeature(feature: GeoJSONType) {
        const point = new GeoJSON().readFeature(feature) as Feature<Geometry>
        this.pointLayer.getSource()?.addFeature(point)
    }

    addFeatures(features) {
        const points = new GeoJSON().readFeatures(features)
        this.pointLayer.getSource()?.addFeatures(points as Feature<Geometry>[])
    }

    /**
     * 将当前图层置于最前面，通过将其 zIndex 设置为所有图层中最高的 zIndex 加一。
     *
     * @return {void} 此函数不返回任何值。
     */
    bringToFront() {
        const maxZIndex = this.map
            .getLayers()
            .getArray()
            .reduce((max, layer) => Math.max(max, layer.getZIndex() || 0), 0)

        // 将图层层级设置为最高层级+1
        this.setZIndex(maxZIndex + 1)
    }

    /**
     * 将点图层置于最底层，通过将其 zIndex 设置为 0。
     *
     * @return {void} 此函数不返回任何值。
     */
    bringToBack() {
        this.setZIndex(0)
    }

    /**
     * 设置图层的 zIndex。
     *
     * @param {number} zIndex - 层级值
     * @return {void} 此函数不返回任何值。
     */
    setZIndex(zIndex: number) {
        this.pointLayer.setZIndex(zIndex)
    }

    bindClick(callback) {
        this.clickCallback = callback
        this.map.on('click', (e) => {
            const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => {
                return feature
            })
            if (feature)
                this.clickCallback(feature)
        })
    }

    removeClick() {
        this.map.un('click', (e) => {
            const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => {
                return feature
            })
            if (feature)
                this.clickCallback(feature)
        })
        this.clickCallback = undefined
    }
}
