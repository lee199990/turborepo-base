/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2024/1/19
 * @Last Modified by:
 * @Last Modified time: 2024/1/19 10:27
 */

import { VectorType } from '../../../controllers'
import type { GeoJsonLayerOption } from '../../../controllers/layer-controller/services/local-geojson'
import { BaseLayer } from './base-layer'

export class LocalGeoJSON extends BaseLayer<GeoJsonLayerOption> {
    override create(): this {
        const {
            geojson,
            id,
            vectorType = VectorType.Line,
        } = this.options
        const map = this.mapInstance
        map.addLayer({
            id,
            paint: this.getPaint(),
            source: { data: geojson, type: 'geojson' },
            type: vectorType,
        })
        return this
    }

    getPaint() {
        const { style, vectorType } = this.options
        if (!style)
            return {}

        switch (vectorType) {
            case VectorType.Circle:
                return { 'circle-color': style['circle-color'] || 'blue', 'circle-radius': style['circle-radius'] || 5 }
                break
            case VectorType.Line:
                return {
                    'line-color': style['line-color'] || 'blue',
                    'line-dasharray': style['line-dash'] || [0, 0],
                    'line-width': style['line-width'] || 2,
                }
                break
            case VectorType.Fill:
                return { 'fill-color': style['fill-color'] || 'blue', 'fill-outline-color': style['fill-outline-color'] || 'blue' }
                break
            default:
                return {}
        }
    }
}
