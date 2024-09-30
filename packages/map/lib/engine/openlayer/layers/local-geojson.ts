/*
 * 文件简短说明
 * @Author: 
 * @Date:   2024/1/19
 * @Last Modified by:
 * @Last Modified time: 2024/1/19 10:27
 */

import type { GeoJsonLayerOption } from '../../../controllers/layer-controller/services/local-geojson'
import { StyleGenerator } from '../../../utils/styleGenerator/StyleGenerator'
import { BaseLayer } from './base-layer'
import type { Feature } from 'ol'
import { GeoJSON } from 'ol/format'
import type { Geometry } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {
    Circle,
    Fill,
    Stroke,
    Style,
} from 'ol/style'

export class LocalGeoJSONLayer extends BaseLayer<GeoJsonLayerOption> {
    override create(): this {
        const {
            geojson,
            id,
            vectorType,
        } = this.options
        const styleGenerator = new StyleGenerator(vectorType, this.options.style)
        const layer = new VectorLayer({ source: new VectorSource({ format: new GeoJSON() }), style: styleGenerator.openlayersStyle.bind(styleGenerator) })
        layer.set('id', id)
        const features = new GeoJSON().readFeatures(geojson) as Feature<Geometry>[]
        layer.getSource()?.addFeatures(features)
        this.mapInstance.addLayer(layer)

        return this
    }

    layerStyleFunction(feature) {
        const type = feature.getGeometry().getType()
        let style
        // 点
        if (type === 'Point' || type === 'MultiPoint' || type === 'circle')
            style = this.getPointStyle()

        // 线
        if (type === 'LineString' || type === 'MultiLineString' || type === 'Line')
            style = this.getLineStyle()

        // 多边形
        if (type === 'Polygon' || type === 'MultiPolygon')
            style = this.getPolygonStyle()

        // 返回 style 数组
        return [style]
    }

    getPointStyle() {
        this.options.style = this.options.style || {}

        return new Style({ image: new Circle({ fill: new Fill({ color: this.options.style['circle-color'] || 'blue' }), radius: this.options.style['circle-radius'] || 5 }) })
    }

    getLineStyle() {
        this.options.style = this.options.style || {}
        return new Style({ stroke: new Stroke({
            color: this.options.style['line-color'] || 'blue',
            lineDash: this.options.style['line-dash'] || [],
            width: this.options.style['line-width'] || 1,
        }) })
    }

    getPolygonStyle() {
        this.options.style = this.options.style || {}
        return new Style({ fill: new Fill({ color: this.options.style['fill-color'] || 'blue' }), stroke: new Stroke({
            color: this.options.style['fill-outline-color'] || 'blue',
            lineDash: this.options.style['fill-outline-dash'] || [],
            width: this.options.style['fill-outline-width'] || 1,
        }) })
    }
}
