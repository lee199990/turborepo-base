/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/12
 * @Last Modified by:
 * @Last Modified time: 2023/12/12 17:20
 */

import { ControllerAdapter } from '../base'

export type eventTypeBase =
    | 'click'
    | 'contextmenu'
    | 'dblclick'
    | 'wheel'
    | 'mouseup'
    | 'mousedown'
    | 'mouseenter'
    | 'mouseout'
    | 'mouseleave'
    | 'mouseover'
    | 'mousemove'
    | 'movestart'
    | 'moveend'
    | 'zoomstart'
    | 'zoomend'
    | 'drag'
    | 'loadstart'
    | 'loadend'

export type Callback = (...arg) => void

export interface MapMouseEvent {
    click?: Callback | null
    contextmenu?: Callback | null
    dblclick?: Callback | null
    mousedown?: Callback | null
    mouseenter?: Callback | null
    mouseleave?: Callback | null
    mousemove?: Callback | null
    mouseout?: Callback | null
    mouseover?: Callback | null
    mouseup?: Callback | null
    wheel?: Callback | null
}

export interface NormalEvent {
    event?: Callback | null
    eventEnd?: Callback | null
    eventStart?: Callback | null
}

interface ValueObject {
    value?: string
}

export abstract class EventControllerAdapter<M = unknown> extends ControllerAdapter<M> {
    protected events = {}

    protected defineProperties = {}

    protected functionalityEvents: ValueObject = Object.create(null)

    /**
     * 将事件回调按类型存储，方便删除监听
     * @param eventType 事件类型
     * @param eventName  事件名称
     * @param callback
     * @protected
     */
    protected addEvents(
        eventType: string,
        eventName: string,
        callback: Callback,
    ) {
        if (this.events[eventType])
            this.events[eventType][eventName] = callback
        else
            Object.assign(this.events, { [eventType]: { [eventName]: callback } })
    }

    protected addDefineProperties(
        eventName: string,
        obj,
        key: PropertyKey,
    ) {
        if (this.defineProperties[eventName])
            this.defineProperties[eventName][key] = obj
        else
            Object.assign(this.defineProperties, { [eventName]: { [key]: obj } })
    }

    /**
     * 将功能性事件回调按类型存储，方便删除监听
     * @param eventName 事件名称
     * @param callback
     * @protected
     */
    protected addFunctionalityEvents(eventName: string, callback: Callback) {
        if (this.functionalityEvents[eventName])
            this.functionalityEvents[eventName] = callback
        else
            Object.assign(this.functionalityEvents, { [eventName]: callback })
    }

    /**
     * 将字符串进行哈希散列获取其哈希值
     * @param str
     * @protected
     */
    protected getHashCode(str: string): number {
        let hash = 0
        if (str.length === 0)
            return hash
        for (let i = 0; i < str.length; i += 1) {
            const chr = str.charCodeAt(i)

            hash = (hash << 5) - hash + chr // hash 左移5位

            hash |= 0 // 转换为 32位 整型值
        }
        return hash
    }

    /**
     * 监听鼠标位置
     * @param callback 回调
     */
    abstract onMousePosition(callback: Callback): this

    /**
     * 关闭鼠标位置监听器
     */
    abstract offMousePosition(): this

    /**
     * 监听地图缩放等级
     * @param callback 回调
     */
    abstract onZoomLevel(callback: Callback): this

    /**
     * 关闭地图缩放等级监听器
     */
    abstract offZoomLevel(): this

    /**
     * 添加事件监听
     * @param eventType 事件类型名称
     * @param callback 回调方法
     * @param eventName 事件名称，不要重复
     */
    abstract on(eventType: eventTypeBase, eventName: string, callback: Callback): this

    /**
     * 关闭事件监听
     * @param eventType 事件类型名称
     * @param eventName 事件 ID
     */
    abstract off(eventType: eventTypeBase, eventName: string): this

    /**
     * 添加只触发一次的监听事件
     * @param eventType 事件类型
     * @param callback
     */
    abstract once(eventType: eventTypeBase, callback: Callback): this

    /**
     * 添加鼠标事件
     * @param mapMouseEvent
     */
    abstract onMouseEvent(mapMouseEvent: MapMouseEvent): this

    /**
     * 监听地图缩放事件
     * @param eventObj
     */
    abstract onZoom(eventObj: NormalEvent): this

    /**
     * 监听地图移动事件，注意不是鼠标移动事件
     * @param eventObj
     */
    abstract onMove(eventObj: NormalEvent): this

    /**
     * 监听地图旋转事件
     * @param eventObj
     */
    abstract onRotate(eventObj: NormalEvent): this

    /**
     * 监听地图加载事件
     * @param eventObj
     */
    abstract onMapLoad(eventObj): this

    /**
     * 移除所有监听事件，功能性事件除外
     */
    abstract removeAllEvent(): this
}
