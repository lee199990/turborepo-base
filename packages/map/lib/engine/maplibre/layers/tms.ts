/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/12
 * @Last Modified by:
 * @Last Modified time: 2023/12/12 10:51
 */

import type { TmsLayerOption } from '../../../controllers'
import {
    LayerFormat,
    LayerSourceType,
    getLayerTypeByFormat,
} from '../../../controllers'
import { BaseLayer } from './base-layer'

export class TmsLayer extends BaseLayer<TmsLayerOption> {
    override create() {
        const {
            format,
            layer,
            tms,
        } = this.options

        if (layer) {
            const appendUrl = type => `:${layer}@EPSG:3857@${type}/{z}/{x}/{y}.${type}`
            switch (format) {
                case LayerFormat.Geojson:
                    this.options.url += appendUrl('geojson')
                    break
                case LayerFormat.Mvt:
                    this.options.url += appendUrl('pbf')
                    break
                case LayerFormat.Png:
                default:
                    this.options.url += appendUrl('png')
            }
        }

        switch (getLayerTypeByFormat(format)) {
            case LayerSourceType.Vector:
                this.activeLayer = this.addLayerForVector({}, { tms })
                break
            case LayerSourceType.Geojson:
                throw new Error('maplibre 暂不支持在线的 geojson 格式的矢量切片图层')
            // return this.addLayerForGeojson({ tms });
            // case 'image':
            //     return this.addLayerForImage(defaultParams);
            case LayerSourceType.Raster:
            default:
                this.activeLayer = this.addLayerForRaster({}, { tms })
        }
        return this
    }
}
