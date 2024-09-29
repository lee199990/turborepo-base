/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2024/1/5
 * @Last Modified by:
 * @Last Modified time: 2024/1/5 10:51
 */
import { MarkerInterface } from '../../../../widget/marker/MarkerInterface'
import type { PopupOptions } from '../../../../widget/overlay/PopupInterface'
import { OpenlayersPopup } from '../overlay/Popup'
import { markerSvg } from './type'
import { Overlay } from 'ol'
import type { Coordinate } from 'ol/coordinate'

export class OpenlayersCustomMarker extends MarkerInterface<Overlay, Coordinate, OpenlayersPopup> {
    setup() {
        if (!this.options) {
            this.marker = this.getDefaultPoint()
            return
        }
        if (!this.options.url) {
            this.marker = this.getDefaultPoint()
            return
        }
        const el = this.options.element || this.getIcon()
        this.marker = new Overlay({ element: el, positioning: 'center-center' })
    }

    private getDefaultPoint() {
        const el = document.createElement('div')
        el.innerHTML = markerSvg
        this.element = el
        return new Overlay({
            element: el,
            offset: [0, -15],
            positioning: 'center-center',
        })
    }

    getMarker(): Overlay {
        return this.marker
    }

    remove() {
        this.marker.setPosition(undefined)
    }

    addTo(map): this {
        map.addOverlay(this.marker)
        return this
    }

    setPosition(position: Coordinate): this {
        this.marker.setPosition(position)
        return this
    }

    getPosition(): Coordinate | undefined {
        return this.marker.getPosition()
    }

    setPopup(
        map,
        content: string | HTMLElement,
        options?: PopupOptions,
    ): this {
        this.popup = new OpenlayersPopup(map, { ...options }).addToMap(map).setContent(content)
        const parentElement = this.popup.getElement()?.parentElement
        if (parentElement)
            parentElement.style.zIndex = '2'

        return this
    }

    removePopup(map): this {
        map.removeOverlay(this.popup)
        this.popup?.close()
        this.popup = undefined
        return this
    }

    openPopup(): this {
        this.popup?.setPosition(this.marker.getPosition() as Coordinate)
        this.popup?.open()
        return this
    }

    closePopup(): this {
        this.popup?.close()
        return this
    }

    setTooltip(
        map,
        content: string | HTMLElement,
        options?: PopupOptions,
    ): this {
        this.tooltip = new OpenlayersPopup(map, { ...options }).addToMap(map).setContent(content)
        const parentElement = this.tooltip.getElement()?.parentElement
        if (parentElement)
            parentElement.style.zIndex = '2'

        return this
    }

    removeTooltip(map): this {
        map.removeOverlay(this.popup)
        this.tooltip?.close()
        this.tooltip = undefined
        return this
    }

    openTooltip(): this {
        this.tooltip?.setPosition(this.marker.getPosition() as Coordinate)
        this.tooltip?.open()
        return this
    }

    closeTooltip(): this {
        this.tooltip?.close()
        return this
    }

    getTooltip(): OpenlayersPopup | undefined {
        return this.tooltip
    }
}
