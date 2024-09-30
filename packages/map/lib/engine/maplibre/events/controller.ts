/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/12
 * @Last Modified by:
 * @Last Modified time: 2023/12/12 17:20
 */

import { controller } from '../../../controllers/decorator'
import {
    Callback,
    EventControllerAdapter,
    MapMouseEvent,
    NormalEvent,
    eventTypeBase,
} from '../../../controllers/event-controller/event-controller'
import { Map } from 'maplibre-gl'

// [maplibre MapEventType doc](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.MapEventType/)
type EventType =
    | eventTypeBase
    | (
        | 'rotate'
        | 'rotatestart'
        | 'rotateend'
        | 'wheel'
        | 'load'
        | 'boxzoomcancel'
        | 'boxzoomstart'
        | 'boxzoomend'
        | 'data'
        | 'dataabort'
        | 'dataloading'
        | 'drag'
        | 'dragend'
        | 'dragstart'
        | 'error'
        | 'idle'
        | 'move'
        | 'moveend'
        | 'movestart'
        | 'pitch'
        | 'pitchend'
        | 'pitchstart'
        | 'remove'
        | 'render'
        | 'resize'
        | 'sourcedata'
        | 'sourcedataabort'
        | 'sourcedataloading'
        | 'styledata'
        | 'styledataloading'
        | 'styleimagemissing'
        | 'terrain'
        | 'tiledataloading'
        | 'webglcontextlost'
        | 'webglcontextrestored'
        | 'zoom'
        | 'zoomend'
        | 'zoomstart'
        | 'mousedown'
        | 'mouseenter'
        | 'mouseleave'
        | 'mousemove'
        | 'mouseout'
        | 'mouseover'
        | 'mouseup'
      )

@controller('CustomMapLibre')
export class EventsController extends EventControllerAdapter<Map> {
    on(
        eventType: EventType,
        eventName: string,
        callback: Callback,
    ): this {
        this.addEvents(
            eventType,
            eventName,
            callback,
        )
        this.mapInstance.on(eventType, callback)
        return this
    }

    onMouseEvent(mapMouseEvent: MapMouseEvent): this {
        const currentHasEvents = Object.getOwnPropertyNames(mapMouseEvent)
        currentHasEvents.forEach((eventType) => {
            if (mapMouseEvent[eventType]) {
                this.addEvents(
                    eventType,
                    `onMouseEvent${this.getHashCode(mapMouseEvent[eventType].toString())}`,
                    mapMouseEvent[eventType],
                )
                this.mapInstance.on(eventType, mapMouseEvent[eventType])
            }
        })
        return this
    }

    off(eventType: EventType, eventName): this {
        const callback = this.events[eventType][eventName]
        this.mapInstance.off(eventType, callback)
        delete this.events[eventType][eventName]
        if (!Object.getOwnPropertyNames(this.events[eventType]).length)
            delete this.events[eventType]

        return this
    }

    once(eventType: EventType, callback): this {
        this.addEvents(
            eventType,
`once${this.getHashCode(callback.toString())}`,
callback,
        )
        this.mapInstance.once(eventType, callback)
        return this
    }

    /**
     * 获取鼠标的位置信息
     * @param callback 回调方法
     */
    onMousePosition(callback): this {
        const fn = (e) => {
            callback({
                lat: e.lngLat.lat,
                lng: e.lngLat.lng,
                x: e.point.x,
                y: e.point.y,
            })
        }
        this.addFunctionalityEvents('onMousePosition', fn)
        this.mapInstance.on('mousemove', fn)
        return this
    }

    offMousePosition(): this {
        const fn = this.functionalityEvents.onMousePosition
        if (fn)
            this.mapInstance.off('mousemove', fn)

        return this
    }

    offZoomLevel(): this {
        const fn = this.functionalityEvents.onZoomLevel
        if (fn)
            this.mapInstance.off('zoom', fn)

        return this
        return this
    }

    onZoomLevel(callback): this {
        const fn = () => {
            callback(Number.parseInt(this.mapInstance.getZoom().toString(), 10))
        }
        this.addFunctionalityEvents('onZoomLevel', fn)
        this.mapInstance.on('zoom', fn)
        return this
    }

    onZoom(eventObj: NormalEvent): this {
        if (eventObj.eventStart) {
            this.addEvents(
                'zoomstart',
                'onZoomStart',
                eventObj.eventStart,
            )
            this.mapInstance.on('zoomstart', eventObj.eventStart)
        }
        if (eventObj.eventEnd) {
            this.addEvents(
                'zoomend',
                'onZoomEnd',
                eventObj.eventEnd,
            )
            this.mapInstance.on('zoomend', eventObj.eventEnd)
        }
        if (eventObj.event) {
            this.addEvents(
                'zoom',
                'onZoom',
                eventObj.event,
            )
            this.mapInstance.on('zoom', eventObj.event)
        }
        return this
    }

    onMove(eventObj: NormalEvent): this {
        if (eventObj.eventStart) {
            this.addEvents(
                'movestart',
                'onMoveStart',
                eventObj.eventStart,
            )
            this.mapInstance.on('movestart', eventObj.eventStart)
        }
        if (eventObj.eventEnd) {
            this.addEvents(
                'moveend',
                'onMoveEnd',
                eventObj.eventEnd,
            )
            this.mapInstance.on('moveend', eventObj.eventEnd)
        }
        if (eventObj.event) {
            this.addEvents(
                'move',
                'onMove',
                eventObj.event,
            )
            this.mapInstance.on('move', eventObj.event)
        }
        return this
    }

    onRotate(eventObj: NormalEvent): this {
        if (eventObj.eventStart) {
            this.addEvents(
                'rotatestart',
                'onRotateStart',
                eventObj.eventStart,
            )
            this.mapInstance.on('rotatestart', eventObj.eventStart)
        }

        if (eventObj.eventEnd) {
            this.addEvents(
                'rotateend',
                'onRotateEnd',
                eventObj.eventEnd,
            )
            this.mapInstance.on('rotateend', eventObj.eventEnd)
        }

        if (eventObj.event) {
            this.addEvents(
                'rotate',
                'onRotate',
                eventObj.event,
            )
            this.mapInstance.on('rotate', eventObj.event)
        }
        return this
    }

    /**
     * 【MapLibre方法】设置地图数据监听器
     * @param data 地图数据加载或者更改回调
     * @param dataloading 地图数据（样式、源、瓷砖等）开始异步加载或更改回调
     * @param dataabort 地图数据中止、异常中断等回调
     */
    onMapLoad(eventObj: { data?: Callback, dataloading?: Callback, dataabort?: Callback }): this {
        if (eventObj.data) {
            this.addEvents(
                'data',
                'onMapData',
                eventObj.data,
            )
            this.mapInstance.on('data', eventObj.data)
        }

        if (eventObj.dataloading) {
            this.addEvents(
                'dataloading',
                'onMapDataLoading',
                eventObj.dataloading,
            )
            this.mapInstance.on('dataloading', eventObj.dataloading)
        }

        if (eventObj.dataabort) {
            this.addEvents(
                'dataabort',
                'onMapDataAbort',
                eventObj.dataabort,
            )
            this.mapInstance.on('dataabort', eventObj.dataabort)
        }
        return this
    }

    removeAllEvent() {
        const currentHasEvents = Object.getOwnPropertyNames(this.events)
        currentHasEvents.forEach((eventType) => {
            const callbackList = Object.getOwnPropertyNames(this.events[eventType])
            callbackList.forEach((callbackName) => {
                this.mapInstance.off(eventType, this.events[eventType][callbackName])
            })
            delete this.events[eventType]
        })
        return this
    }
}
