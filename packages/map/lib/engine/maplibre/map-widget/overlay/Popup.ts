/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/28
 * @Last Modified by:
 * @Last Modified time: 2023/12/28 9:28
 */

import { PopupInterface } from '../../../../widget/overlay/PopupInterface'
import './style.scss'
import type {
    LngLat,
    Map,
    Offset,
    PositionAnchor,
} from 'maplibre-gl'
import { Popup } from 'maplibre-gl'

export class MaplibrePopup extends PopupInterface<Map, Popup, LngLat> {
    init() {
        const positioning: PositionAnchor = this.options?.positioning || 'bottom'
        const offset: Offset = this.options?.offset || [0, 0]
        this.overlay = new Popup({
            anchor: positioning,
            className: this.options?.className,
            closeButton: !this.options?.removeCloseButton,
            maxWidth: this.options?.maxWidth ? `${this.options?.maxWidth}px` : `300px`,
            offset,
        })
    }

    /**
     * 设置位置
     * @param position
     */
    setPosition(position: LngLat) {
        this.position = position
        this.overlay.setLngLat(this.position).addTo(this.map)
    }

    setContent(content: string | HTMLElement): this {
        this.content = content
        if (typeof content === 'string')
            this.overlay.setHTML(content)
        else
            this.overlay.setDOMContent(content)

        return this
    }

    getPosition(): LngLat | undefined {
        return this.overlay.getLngLat()
    }

    getElement() {
        return this.overlay.getElement()
    }

    addToMap(map): this {
        this.overlay?.addTo(map)
        return this
    }

    open() {
        this.overlay.setLngLat(this.position).addTo(this.map)
    }

    close() {
        this.overlay.remove()
    }
}
