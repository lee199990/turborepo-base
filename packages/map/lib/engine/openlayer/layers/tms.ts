/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/12
 * @Last Modified by:
 * @Last Modified time: 2023/12/12 10:09
 */
import type { TmsLayerOption } from '../../../controllers'
import { LayerSourceType, getLayerTypeByFormat } from '../../../controllers'
import { createSubdomains } from '../../../tools'
import { BaseLayer } from './base-layer'
import { XYZ } from 'ol/source'

export class TmsLayer extends BaseLayer<TmsLayerOption> {
    override create() {
        const {
            format,
            maxZoom,
            minZoom,
            subdomains,
            url,
        } = this.options
        const urls = subdomains ? createSubdomains(url, subdomains) : [url]
        switch (getLayerTypeByFormat(format)) {
            case LayerSourceType.Vector:
                this.activeLayer = this.createLayerForVecTile({}, { tms: true })
                break
            case LayerSourceType.Raster:
            default:
                this.activeLayer = this.addLayerForRaster(new XYZ({
                    crossOrigin: 'anonymous',
                    maxZoom,
                    minZoom,
                    url: urls[0],
                    urls,
                }))
        }

        return this
    }
}
