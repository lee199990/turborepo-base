/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 19:06
 */
import { LayerServerType, LayersControllerAdapter } from '../../../controllers'
import { controller } from '../../../controllers/decorator'
import { LocalGeoJSONLayer } from './local-geojson'
import { TmsLayer } from './tms'
import { WmsLayer } from './wms'
import { WmtsLayer } from './wmts'
import { Map } from 'ol'
import { Vector } from 'ol/layer'
import VectorSource from 'ol/source/Vector'

@controller('CustomOpenLayers')
export class LayersController extends LayersControllerAdapter<Map> {
    parsers = {
        [LayerServerType.LocalGeoJSON]: LocalGeoJSONLayer,
        [LayerServerType.Tms]: TmsLayer,
        [LayerServerType.Wms]: WmsLayer,
        [LayerServerType.Wmts]: WmtsLayer,
    }

    emptyVector(id: string) {
        const vector = new Vector({ properties: { id }, source: new VectorSource({ wrapX: false }) })
        this.mapInstance.addLayer(vector)
        return vector
    }
}
