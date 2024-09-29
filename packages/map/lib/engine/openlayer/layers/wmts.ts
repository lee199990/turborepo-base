/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 20:05
 */
import type { WmtsLayerOption } from '../../../controllers'
import {
    LayerSourceType,
    WMTSParams,
    getLayerTypeByFormat,
} from '../../../controllers'
import { BaseLayer } from './base-layer'
import { WMTS } from 'ol/source'

export class WmtsLayer extends BaseLayer<WmtsLayerOption> {
    override create() {
        const {
            format,
            layer,
            requestStyle,
            requestVersion,
            url,
        } = this.options
        const projection = this.mapInstance.getView().getProjection()
        const projCode = projection.getCode()

        const defaultParams = WMTSParams.create({
            format,
            layer,
            style: requestStyle,
            tileCol: '{x}',
            tileMatrix: `${projCode}:{z}`,
            tileMatrixSet: projCode,
            tileRow: '{y}',
            version: requestVersion,
        })

        switch (getLayerTypeByFormat(format)) {
            case LayerSourceType.Vector:
                this.activeLayer = this.createLayerForVecTile(defaultParams)
                break
            case LayerSourceType.Raster:
            default:
                this.activeLayer = this.addLayerForRaster(new WMTS({
                    ...defaultParams,
                    layer,
                    matrixSet: defaultParams.tileMatrixSet,
                    tileGrid: this.getTileGrid(),
                    url,
                }))
            // return this.addLayerForRaster(defaultParams);
        }

        return this
    }
}
