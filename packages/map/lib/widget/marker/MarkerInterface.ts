/*
 * 文件简短说明
 * @Author: 
 * @Date:   2024/1/5
 * @Last Modified by:
 * @Last Modified time: 2024/1/5 16:29
 */

import type { PopupOptions } from '../overlay/PopupInterface'

export interface Options {
    className?: string
    element?: HTMLElement
    height?: number
    url?: string
    width?: number
}

export abstract class MarkerInterface<M, P, T> {
    protected marker!: M

    protected element!: HTMLElement

    protected popup!: T | undefined

    protected tooltip!: T | undefined

    constructor(protected options?: Options) {
        this.setup()
    }

    /**
     * 获取图标的 dom 元素，用于初始化。
     *
     * @return {HTMLElement} 图标的 dom 元素。
     */
    protected getIcon(): HTMLElement {
        const width = this.options?.width || 40
        const height = this.options?.height || 40
        const markerElement = document.createElement('div')
        if (this.options?.className)
            markerElement.classList.add(this.options?.className)
        markerElement.style.width = `${width}px`
        markerElement.style.height = `${height}px`
        const markerWrap = document.createElement('div')
        markerWrap.className = 'marker-wrap'
        markerElement.appendChild(markerWrap)
        const img = document.createElement('img')
        img.src = this.options?.url as string
        markerWrap.appendChild(img)
        this.element = markerElement
        return markerElement
    }

    /**
     * 获取图标的 dom 元素。
     *
     * @return {HTMLElement} 图标的 dom 元素。
     */
    public getElement() {
        return this.element
    }

    /**
     * 初始化设置。
     *
     */
    abstract setup()

    /**
     * 获取标记。
     *
     * @return {M} 标记。
     */
    abstract getMarker(): M

    /**
     * 删除当前标点
     *
     * @return {void}。
     */
    abstract remove(): void

    /**
     * 将当前实例添加到指定的地图中。
     *
     * @param {any} map - 要添加实例的地图。
     * @return {this} 修改后的实例。
     */
    abstract addTo(map): this

    /**
     * 设置标记点的位置。
     *
     * @param {P} position - 要设置的新位置。
     * @return {this}。
     */
    abstract setPosition(position: P): this

    /**
     * 整个函数的描述。
     *
     * @return {P | undefined} 位置。
     */
    abstract getPosition(): P | undefined

    /**
     * 使用给定的内容和选项，在地图上设置一个弹出窗口。
     *
     * @param {object} map - 要在其上设置弹出窗口的地图对象。
     * @param {string | HTMLElement} content - 弹出窗口中要显示的内容。
     * @param {PopupOptions} [options] - 弹出窗口的选项。
     * @return {this} - 当前类的实例。
     */
    abstract setPopup(map, content: string | HTMLElement, options?: PopupOptions): this

    /**
     * 从地图中移除弹出窗口。
     *
     * @param {any} map - 要从中移除弹出窗口的地图对象。可选参数。
     * @return {this} - 类的当前实例。
     */
    abstract removePopup(map?): this

    /**
     * 打开弹出窗口。
     *
     * @return {this} 类的当前实例。
     */
    abstract openPopup(): this

    /**
     * 关闭弹出窗口。
     *
     * @return {this} 类的当前实例。
     */
    abstract closePopup(): this

    /**
     * 设置给定地图元素的提示框。
     *
     * @param {object} map - 地图对象。
     * @param {string | HTMLElement} content - 提示框的内容。可以是字符串或 HTML 元素。
     * @param {PopupOptions} [options] - 提示框的选项。
     * @return {this} 返回类的实例。
     */
    abstract setTooltip(map, content: string | HTMLElement, options?: PopupOptions): this

    /**
     * 从地图中移除提示框。
     *
     * @return {this} 类的当前实例。
     */
    abstract removeTooltip(map?): this

    /**
     * 打开弹出窗口。
     *
     * @return {this} 类的当前实例。
     */
    abstract openTooltip(): this

    /**
     * 关闭弹出窗口。
     *
     * @return {this} 类的当前实例。
     */
    abstract closeTooltip(): this

    /**
     * 返回提示框对象。
     *
     * @return {T | undefined} 提示框对象，如果不可用则返回undefined。
     */
    abstract getTooltip(): T | undefined
}
