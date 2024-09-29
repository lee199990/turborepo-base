/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 13:46
 */
import type { WmtsLayerOption } from '../../../controllers'
import {
    LayerSourceType,
    WMTSParams,
    getLayerTypeByFormat,
} from '../../../controllers'
import { BaseLayer } from './base-layer'

export class WmtsLayer extends BaseLayer<WmtsLayerOption> {
    override create() {
        const {
            format,
            layer,
            requestStyle,
            requestVersion,
        } = this.options
        const defaultParams = WMTSParams.create({
            format,
            layer,
            style: requestStyle,
            tileCol: '{x}',
            tileMatrix: 'EPSG:3857:{z}',
            tileMatrixSet: 'EPSG:3857',
            tileRow: '{y}',
            version: requestVersion,
        })
        // this.checkSourceExist(`${layer}-source`);
        switch (getLayerTypeByFormat(format)) {
            case LayerSourceType.Vector:
                this.activeLayer = this.addLayerForVector(defaultParams)
                break
            case LayerSourceType.Geojson:
                throw new Error('maplibre 暂不支持在线的 geojson 格式的矢量切片图层')
            case LayerSourceType.Raster:
            default:
                this.activeLayer = this.addLayerForRaster(defaultParams)
        }
        return this
    }
}
