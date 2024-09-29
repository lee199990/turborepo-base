/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 14:03
 */
import { LayerServerType, LayersControllerAdapter } from '../../../controllers'
import { controller } from '../../../controllers/decorator'
import { LocalGeoJSON } from './local-geojson'
import { TmsLayer } from './tms'
import { WmsLayer } from './wms'
import { WmtsLayer } from './wmts'
import { GeoJSONSource, Map } from 'maplibre-gl'

@controller('CustomMapLibre')
export class LayersController extends LayersControllerAdapter<Map> {
    protected parsers = {
        [LayerServerType.LocalGeoJSON]: LocalGeoJSON,
        [LayerServerType.Tms]: TmsLayer,
        [LayerServerType.Wms]: WmsLayer,
        [LayerServerType.Wmts]: WmtsLayer,
    }

    constructor(protected mapInstance: Map) {
        super(mapInstance)
        console.warn('请注意，maplibre目前只支持3857底图，调用图层时将默认请求3857坐标系底图')
    }

    emptyVector(id: string) {
        const sourceId = `${id}-source`
        this.mapInstance.addSource(sourceId, { data: { features: [], type: 'FeatureCollection' }, type: 'geojson' })
        this.mapInstance.addLayer({
            id: `${id}.circle`,
            paint: { 'circle-color': '#3887be', 'circle-radius': 10 },
            source: sourceId,
            type: 'circle',
            zIndex: 100,
        })
        this.mapInstance.addLayer({
            id: `${id}.line`,
            paint: {},
            source: sourceId,
            type: 'line',
            zIndex: 100,
        })
        return this.mapInstance.getSource(sourceId) as GeoJSONSource
    }
}
