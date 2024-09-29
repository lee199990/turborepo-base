/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/5
 * @Last Modified by:
 * @Last Modified time: 2023/12/5 9:50
 */

import { controller } from '../../../controllers/decorator'
import {
    Callback,
    EventControllerAdapter,
    MapMouseEvent,
    NormalEvent,
    eventTypeBase,
} from '../../../controllers/event-controller/event-controller'
import {
    Map,
    MapBrowserEvent,
    MapEvent,
} from 'ol'

// [openlayers Event doc](https://openlayers.org/en/latest/apidoc/module-ol_events_Event.html)
type EventType =
    | eventTypeBase
    | (
        | 'singleclick'
        | 'loadend'
        | 'loadstart'
        | 'error'
        | 'change'
        | 'propertychange'
        | 'rendercomplete'
        | 'postcompose'
        | 'postrender'
        | 'precompose'
        | 'change:view'
        | 'change:layergroup'
        | 'change:target'
        | 'change:size'
      )

type EventRelayMode = 'on' | 'listener'

@controller('CustomOpenLayers')
export class EventsController extends EventControllerAdapter<Map> {
    // 事件中继器
    private eventRepeaters = {
        click: this.getEventRelayRules('click'),
        contextmenu: this.getEventRelayRules('contextmenu'),
        dblclick: this.getEventRelayRules('dblclick'),
        drag: this.getEventRelayRules('pointerdrag'),
        loadend: this.getEventRelayRules('loadend'),
        loadstart: this.getEventRelayRules('loadstart'),
        mousedown: this.getEventRelayRules('mousedown', 'listener'),
        mouseenter: this.getEventRelayRules('mouseenter', 'listener'),
        mouseleave: this.getEventRelayRules('mouseleave', 'listener'),
        mousemove: this.getEventRelayRules('pointermove'),
        mouseout: this.getEventRelayRules('mouseout', 'listener'),

        mouseover: this.getEventRelayRules('mouseover', 'listener'),
        mouseup: this.getEventRelayRules('mouseup', 'listener'),
        moveend: this.getEventRelayRules('moveend'),
        movestart: this.getEventRelayRules('movestart'),
        wheel: this.getEventRelayRules('wheel'),
        zoomend: this.getEventRelayRules('zoomend'),
        zoomstart: this.getEventRelayRules('movestart'),
    }

    /**
     * 返回格式化的事件中继规则
     * @param originType 地图实际事件名称
     * @param mode 事件添加方法，默认使用地图提供的 on 方法
     */
    private getEventRelayRules(originType: string, mode: EventRelayMode = 'on') {
        return { mode, originType }
    }

    /**
     * 获取对应地图事件名称，防止在中继器中找不到出错
     * @param eventType
     * @private
     */
    private getOriginEvent(eventType: EventType) {
        return this.eventRepeaters[eventType] || this.getEventRelayRules(eventType)
    }

    /**
     * 将原生事件对象包装成 ol 的 MapBrowserEvent
     * @param originType ol 的事件类型
     * @param originalEvent 原生事件对象
     * @private
     */
    private packMapBrowserEvent(originType, originalEvent) {
        /* eslint-disable */
        // @ts-ignore
        const frameState = this.mapInstance.frameState_;
        const pack = new MapBrowserEvent(
            originType,
            this.mapInstance,
            originalEvent,
            undefined,
            frameState
        );
        pack.target = this.mapInstance;
        // pack.coordinate_ = pack.coordinate;
        // pack.pixel_ = pack.pixel;
        /* eslint-enable */

        // 原生事件 getViewport().addEventListener
        // ol 的 MapBrowserEvent 事件
        // this.mapInstance.addEventListener(e.originType, callback);

        return pack
    }

    private setPropertyListener(propertyName: string, callback: Callback) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error

        Object.defineProperty(
            this.mapInstance.values_.view.values_,
            propertyName,
            { set(val) {
                callback(true)
            } },
        )
    }

    private setPropertyProxy(name: string, callback) {
        /* eslint-disable */
        // @ts-ignore
        this.mapInstance.values_.view.values_ = new Proxy(this.mapInstance.values_.view.values_, {
            set(target, key, newValue) {
                if (key === name) {
                    callback(true);
                }
                target[key] = newValue;
                return true;
            }
        });
        /* eslint-enable */
    }

    on(
        eventType: EventType,
        eventName: string,
        callback: Callback,
    ): this {
        const { mode, originType } = this.getOriginEvent(eventType)
        let tempCallback
        if (mode === 'on') {
            this.mapInstance.on(originType, callback)
            tempCallback = callback
        }
        else {
            tempCallback = (e) => {
                callback(this.packMapBrowserEvent(originType, e))
            }
            this.mapInstance.getViewport().addEventListener(originType, tempCallback)
        }
        this.addEvents(
            originType,
            eventName,
            tempCallback,
        )
        return this
    }

    off(eventType: EventType, eventName): this {
        const callback = this.events[eventType][eventName]
        const { mode, originType } = this.getOriginEvent(eventType)
        if (mode === 'on')
            this.mapInstance.un(originType, callback)
        else
            this.mapInstance.getViewport().removeEventListener(originType, callback)

        delete this.events[originType][eventName]
        if (!Object.getOwnPropertyNames(this.events[originType]).length)
            delete this.events[originType]

        return this
    }

    once(eventType: EventType, callback): this {
        const { mode, originType } = this.getOriginEvent(eventType)
        let tempCallback
        if (mode === 'on') {
            this.mapInstance.once(originType, callback)
            tempCallback = callback
        }
        else {
            tempCallback = (e) => {
                callback(this.packMapBrowserEvent(originType, e))
            }
            this.mapInstance
                .getViewport()
                .addEventListener(
                    originType,
                    tempCallback,
                    { once: true },
                )
        }
        this.addEvents(
            originType,
`once${this.getHashCode(callback.toString())}`,
tempCallback,
        )
        return this
    }

    onMouseEvent(mapMouseEvent: MapMouseEvent): this {
        const currentHasEvents = Object.getOwnPropertyNames(mapMouseEvent)
        currentHasEvents.forEach((eventType: EventType) => {
            if (mapMouseEvent[eventType]) {
                this.addEvents(
                    eventType,
                    `onMouseEvent${this.getHashCode(mapMouseEvent[eventType].toString())}`,
                    mapMouseEvent[eventType],
                )
                this.on(
                    eventType,
                    eventType,
                    mapMouseEvent[eventType],
                )
            }
        })
        return this
    }

    onMousePosition(callback): this {
        const fn = (e) => {
            callback({
                lat: e.coordinate[1],
                lng: e.coordinate[0],
                x: e.pixel[0],
                y: e.pixel[1],
            })
        }
        this.addFunctionalityEvents('onMousePosition', fn)
        this.mapInstance.on('pointermove', fn)
        return this
    }

    offMousePosition(): this {
        const fn = this.functionalityEvents.onMousePosition
        if (fn)
            this.mapInstance.un('pointermove', fn)

        return this
    }

    onZoomLevel(callback): this {
        const fn = () => {
            const zoomLevel = this.mapInstance.getView().getZoom()
            if (zoomLevel)
                callback(Number.parseInt(zoomLevel.toString(), 10))
        }
        this.addFunctionalityEvents('onZoomLevel', fn)
        this.mapInstance.on('moveend', fn)
        return this
    }

    offZoomLevel() {
        const fn = this.functionalityEvents.onZoomLevel
        if (fn)
            this.mapInstance.un('moveend', fn)

        return this
    }

    onZoom({
        event,
eventEnd,
eventStart,
    }: NormalEvent): this {
        let flag = false
        if (event || eventStart || eventEnd) {
            /* eslint-disable */
            const zoom = c => {
                flag = c;
                if (event) {
                    // @ts-ignore
                    const e = new MapEvent('zoom', this.mapInstance, this.mapInstance.frameState_);
                    e.target = this.mapInstance;
                    event(e);
                }
            };
            this.setPropertyListener('zoom', zoom);
            // @ts-ignore
            this.addDefineProperties('zoom', this.mapInstance.values_.view.values_, 'zoom');
            /* eslint-enable */
        }
        if (eventStart) {
            const fn = (e) => {
                if (!flag)
                    return
                e.type = 'zoomstart'
                eventStart(e)
                flag = false
            }
            this.addEvents(
                'movestart',
                'onZoomStart',
                fn,
            )
            this.mapInstance.on('movestart', fn)
        }
        if (eventEnd) {
            const fn = (e) => {
                if (!flag)
                    return
                e.type = 'zoomend'
                eventEnd(e)
                flag = false
            }
            this.addEvents(
                'moveend',
                'onZoomEnd',
                fn,
            )
            this.mapInstance.on('moveend', fn)
        }
        return this
    }

    onMove({
        event,
eventEnd,
eventStart,
    }: NormalEvent): this {
        let flag = false
        if (event || eventStart || eventEnd) {
            const move = (c) => {
                flag = c
                if (event) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error

                    const e = new MapEvent(
                        'move',
                        this.mapInstance,
                        this.mapInstance.frameState_,
                    )
                    e.target = this.mapInstance
                    event(e)
                }
            }
            this.setPropertyProxy('center', move)
        }
        if (eventStart) {
            const fn = (e) => {
                if (!flag)
                    return
                eventStart(e)
                flag = false
            }
            this.addEvents(
                'movestart',
                'onMoveStart',
                fn,
            )
            this.mapInstance.on('movestart', fn)
        }
        if (eventEnd) {
            const fn = (e) => {
                if (!flag)
                    return
                eventEnd(e)
                flag = false
            }
            this.addEvents(
                'moveend',
                'onMoveEnd',
                fn,
            )
            this.mapInstance.on('moveend', fn)
        }
        return this
    }

    // eslint-disable-next-line
    onRotate(eventObj: NormalEvent): this {
        console.log('\n==========================================')
        console.log('onRotate: 此类型地图不存在旋转监听事件')
        console.log('==========================================\n\n')
        return this
    }

    /**
     * 【OpenLayers方法】 设置 load 监听
     * @param eventObj loadstart load 开始；loadend load 结束
     */
    onMapLoad(eventObj: { loadstart?: Callback, loadend?: Callback }): this {
        if (eventObj.loadstart) {
            this.on(
                'loadstart',
                'loadstart',
                eventObj.loadstart,
            )
        }

        if (eventObj.loadend) {
            this.on(
                'loadend',
                'loadend',
                eventObj.loadend,
            )
        }

        return this
    }

    removeAllEvent() {
        // 移除普通事件监听
        const currentHasEvents = Object.getOwnPropertyNames(this.events)
        const currentHasdefineProperties = Object.getOwnPropertyNames(this.defineProperties)
        currentHasEvents.forEach((eventType: EventType) => {
            const callbackList = Object.getOwnPropertyNames(this.events[eventType])
            callbackList.forEach((callbackName) => {
                this.off(eventType, callbackName)
            })
            delete this.events[eventType]
        })

        // 移除单属性代理监听
        currentHasdefineProperties.forEach((eventName) => {
            const keyList = Object.getOwnPropertyNames(this.defineProperties[eventName])
            keyList.forEach((key) => {
                Object.defineProperty(
                    this.defineProperties[eventName][key],
                    key,
                    { set(val) {} },
                )
            })
            delete this.defineProperties[eventName]
        })

        // 移除对象或数组 Proxy 代理监听
        /* eslint-disable */
        // @ts-ignore
        const propertiesList = Object.getOwnPropertyNames(this.mapInstance.values_.view.values_);
        const newObj = {};
        propertiesList.forEach(propertyName => {
            Object.assign(newObj, {
                // @ts-ignore
                [propertyName]: this.mapInstance.values_.view.values_[propertyName]
            });
        });
        // @ts-ignore
        this.mapInstance.values_.view.values_ = newObj;
        /* eslint-enable */
        return this
    }
}
