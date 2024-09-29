/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/9
 * @Last Modified by:
 * @Last Modified time: 2023/12/9 14:31
 */
import { InitConfig } from '../../config'
import { ControllerName } from '../../controllers'
import { setupControl } from '../../controllers/decorator'
import { Controllers } from '../../gismap-modules'
import { IMap } from '../../IMap'
import { addOrderLayerToMapOut } from './addons/order-layers'
import { EventsController } from './events/controller'
import { MapStatus } from './map-status/status'
import { Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface OpenLayerControllers extends Controllers<Map> {
    [ControllerName.Event]: EventsController
}

@setupControl
export class CustomMapLibre extends IMap<Map, OpenLayerControllers> {
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
        const map = new Map({
            attributionControl: false,
            center: option.position,
            container,
            doubleClickZoom: false,
            maxZoom,
            minZoom,
            preserveDrawingBuffer: true,
            style: {
                layers: [{
                    id: 'background',
                    paint: { 'background-color': 'rgb(2,26,80)' },
                    type: 'background',
                }],
                sources: {},
                version: 8,
            },
            zoom,
        })
        addOrderLayerToMapOut(map)
        return map
    }

    getControl<K extends ControllerName>(key: K): (typeof this.controllers)[K] {
        return this.controllers[key]
    }

    onLoaded(): Promise<void> {
        return new Promise((resolve) => {
            this.instance.on('load', () => resolve())
        })
    }

    destroy() {
        super.destroy()
        this.instance.remove()
    }
}
