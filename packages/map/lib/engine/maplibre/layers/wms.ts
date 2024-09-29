/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 16:45
 */

import type { WmsLayerOption } from '../../../controllers'
import {
    LayerSourceType,
    WMSParams,
    getLayerTypeByFormat,
} from '../../../controllers'
import { BaseLayer } from './base-layer'

export class WmsLayer extends BaseLayer<WmsLayerOption> {
    override create() {
        const {
            format,
            layer,
            requestStyle,
            requestVersion,
            transparent = true,
        } = this.options
        const defaultParams = WMSParams.create({
            bbox: '{bbox-epsg-3857}',
            format,
            layers: layer,
            srs: 'EPSG:3857',
            styles: requestStyle,
            transparent,
            version: requestVersion,
        })
        this.checkSourceExist(`${layer}-source`)
        switch (getLayerTypeByFormat(format)) {
            case LayerSourceType.Vector:
                this.activeLayer = this.addLayerForVector(defaultParams)
                break
            // case 'image':
            //     return this.addLayerForImage(defaultParams);
            case LayerSourceType.Raster:
            default:
                this.activeLayer = this.addLayerForRaster(defaultParams)
        }
        return this
    }
}
