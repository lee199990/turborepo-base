/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 19:09
 */

import type { WmsLayerOption } from '../../../controllers'
import {
    LayerSourceType,
    WMSParams,
    getLayerTypeByFormat,
} from '../../../controllers'
import { BaseLayer } from './base-layer'
import { upperObjectKey } from '@jmrepo/utils'
import { TileWMS } from 'ol/source'

export class WmsLayer extends BaseLayer<WmsLayerOption> {
    override create() {
        const {
            format,
            layer,
            requestStyle,
            requestVersion,
            transparent = true,
            url,
        } = this.options
        if (getLayerTypeByFormat(format) === LayerSourceType.Vector) {
            // XXX: 支持矢量瓦片
            throw new Error('openlayers wms图层服务暂不支持矢量瓦片')
        }
        const defaultParams = upperObjectKey(WMSParams.create({
            format,
            layers: layer,
            styles: requestStyle,
            transparent,
            version: requestVersion,
        }))
        this.activeLayer = this.addLayerForRaster(new TileWMS({
            crossOrigin: 'anonymous',
            params: defaultParams,
            url,
        }))
        return this
    }
}
