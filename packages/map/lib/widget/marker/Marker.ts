/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2024/1/5
 * @Last Modified by:
 * @Last Modified time: 2024/1/5 11:19
 */

import { getTypeOfMapInstance } from '../../../util/checkTypeOfMapInstance'
import { isCustomMapLibre } from '../../../util/isCustomMapLibre'
import { MaplibreCustomMarker } from '../../engine/maplibre/map-widget/customMarker/CustomMarker'
import { OpenlayersCustomMarker } from '../../engine/openlayer/map-widget/customMarker/CustomMarker'
import type { PopupOptions } from '../overlay/PopupInterface'
import type { Options } from './MarkerInterface'
import './style.scss'

export class Marker {
    private marker!: OpenlayersCustomMarker | MaplibreCustomMarker

    constructor(private map, private options?: Options) {
        if (getTypeOfMapInstance(map) === 'unknown') {
            throw new Error('未知的地图类型, 请检查构造器传入参数是否正确')
        }
        else {
            this.marker = isCustomMapLibre(map)
                ? new MaplibreCustomMarker(this.options)
                : new OpenlayersCustomMarker(this.options)
        }
    }

    /**
     * 获取标记。
     *
     * @return 标记。
     */
    getMarker() {
        return this.marker.getMarker()
    }

    /**
     * 删除当前标点
     *
     * @return {void}。
     */
    remove() {
        this.marker.remove()
    }

    /**
     * 将当前实例添加到指定的地图中。
     *
     * @param {any} map - 要添加实例的地图。
     * @return {this} 修改后的实例。
     */
    addTo(map): this {
        this.marker.addTo(map)
        return this
    }

    /**
     * 设置标记点的位置。
     *
     * @param {P} position - 要设置的新位置。
     * @return {this}。
     */
    setPosition(position): this {
        this.marker.closePopup()
        this.marker.setPosition(position)
        return this
    }

    /**
     * 附加一个事件监听器到与标记关联的元素。
     *
     * @param {string} eventName - 要监听的事件名称。
     * @param {Function} callback - 当事件触发时要执行的回调函数。
     * @return {this} 返回类的实例，用于方法链式调用。
     */
    on(eventName, callback): this {
        const el = this.marker.getElement()
        el.addEventListener(eventName, (e) => {
            Object.assign(e, { position: this.marker.getPosition() })
            callback(e)
            this.stopPropagation(e)
        })
        return this
    }

    /**
     * 从标记元素中移除事件监听器。
     *
     * @param {string} eventName - 事件的名称。
     * @param {Function} callback - 事件回调函数。
     * @return {this} 返回当前类的实例。
     */
    off(eventName, callback): this {
        const el = this.marker.getElement()
        el.removeEventListener(eventName, (e) => {
            Object.assign(e, { position: this.marker.getPosition() })
            callback(e)
            this.stopPropagation(e)
        })
        return this
    }

    /**
     * 设置弹出窗口的内容和选项。
     *
     * @param {any} content - 弹出窗口中要显示的内容。
     * @param {PopupOptions} popupOptions - 弹出窗口的可选选项。
     * @return {this} - 当前类的实例，用于方法链式调用。
     */
    setPopup(content, popupOptions?: PopupOptions) {
        this.marker.setPopup(
            this.map.instance,
            content,
            popupOptions,
        )
        const el = this.marker.getElement() || this.marker.getMarker().getElement()
        el.addEventListener('click', this.clickForPopup.bind(this))
        return this
    }

    /**
     * 从地图中移除弹出窗。
     *
     * @return {this} 类的当前实例。
     */
    removePopup(): this {
        const el = this.marker.getElement() || this.marker.getMarker().getElement()
        el?.removeEventListener('click', this.clickForPopup.bind(this))
        this.marker.removePopup(this.map.instance)
        return this
    }

    /**
     * 打开弹出窗口。
     *
     * @return {this} 类的当前实例。
     */
    openPopup(): this {
        this.marker.openPopup()
        return this
    }

    /**
     * 关闭弹出窗口。
     *
     * @return {this} 类的当前实例。
     */
    closePopup(): this {
        this.marker.closePopup()
        return this
    }

    /**
     * 设置标记的提示框。
     *
     * @param {any} content - 提示框的内容。
     * @param {PopupOptions} popupOptions - 提示框的选项。（可选）
     * @return {this} - 返回类的实例。
     */
    setTooltip(content, popupOptions?: PopupOptions) {
        const options = popupOptions || { removeCloseButton: true }
        options.removeCloseButton = true
        this.marker.setTooltip(
            this.map.instance,
            content,
            options,
        )
        const el = this.marker.getElement() || this.marker.getMarker().getElement()
        el.addEventListener('mouseenter', this.enterForTooltip.bind(this))
        el?.addEventListener('mousemove', this.stopPropagation)
        return this
    }

    /**
     * 从地图中移除提示框。
     *
     * @return {this} 类的当前实例。
     */
    removeTooltip(): this {
        const el = this.marker.getElement() || this.marker.getMarker().getElement()
        el?.removeEventListener('mouseenter', this.enterForTooltip.bind(this))
        this.marker.removeTooltip(this.map.instance)
        return this
    }

    /**
     * 打开弹出窗口。
     *
     * @return {this} 类的当前实例。
     */
    openTooltip() {
        this.marker.openTooltip()
    }

    /**
     * 关闭弹出窗口。
     *
     * @return {this} 类的当前实例。
     */
    closeTooltip(): this {
        this.marker.closeTooltip()
        return this
    }

    /**
     * 单击触发弹出框。
     *
     * @param {type} e - 事件对象
     * @return {void}
     */
    private clickForPopup(e) {
        this.stopPropagation(e)
        this.marker.openPopup()
    }

    /**
     * 进入提示框的事件处理，用于模拟 hover。
     *
     * @param {Event} e - 事件对象。
     */
    private enterForTooltip(e) {
        e.stopPropagation()
        this.marker.openTooltip()
        this.marker.getTooltip()?.getElement()?.addEventListener('mousemove', this.stopPropagation)
        let viewport: HTMLElement | undefined
        if (this.map.instance.getContainer)
            viewport = this.map.instance.getContainer()
        else if (this.map.instance.getViewport)
            viewport = this.map.instance.getViewport()

        viewport?.addEventListener(
            'mousemove',
            this.leaveForTooltip.bind(this),
            { once: true },
        )
    }

    /**
     * 离开提示框的事件处理，用于模拟 hover。
     *
     * @param {Event} e - 事件对象。
     */
    private leaveForTooltip(e) {
        this.stopPropagation(e)
        this.marker.closeTooltip()
    }

    /**
     * 停止事件传播并阻止默认行为。
     *
     * @param {Event} e - 事件对象。
     */
    private stopPropagation(e) {
        e.stopPropagation()
        e.preventDefault()
    }
}
