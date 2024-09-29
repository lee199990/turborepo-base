/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 9:54
 */
import { InitConfig } from '../../config'
import { ControllerName } from '../../controllers'
import { setupControl } from '../../controllers/decorator'
import { Controllers } from '../../gismap-modules'
import { IMap } from '../../IMap'
import { EventsController } from './events/controller'
import { MapStatus } from './map-status/status'
import { Map, View } from 'ol'
import { defaults } from 'ol/interaction'
import { Tile } from 'ol/layer'
import 'ol/ol.css'
import { TileDebug } from 'ol/source'

interface OpenLayerControllers extends Controllers<Map> {
    [ControllerName.Event]: EventsController
}

@setupControl
export class CustomOpenLayers extends IMap<Map, OpenLayerControllers> {
    constructor(container: string, option?: InitConfig) {
        super(container, option)
        this.status = new MapStatus(this.instance)
    }

    protected setup(container: string, option: InitConfig): Map {
        const {
            active: zoom,
            max: maxZoom,
            min: minZoom,
        } = option.zoom
        return new Map({
            interactions: defaults({ doubleClickZoom: false, // 禁用双击放大地图
            }),
            layers: [new Tile({ source: new TileDebug({}) })],
            target: container,
            view: new View({
                center: option.position,
                constrainResolution: true,
                maxZoom,
                minZoom,
                // 地图视图
                projection: 'EPSG:4326', // 坐标系，有EPSG:4326和EPSG:3857
                zoom,
            }),
        })
    }

    onLoaded(): Promise<void> {
        return new Promise((resolve) => {
            this.instance.on('loadend', () => resolve())
        })
    }

    destroy() {
        super.destroy()
        for (const [_, control] of Object.entries(this.controllers))
            control.destroy()

        this.instance.dispose()
    }
}
