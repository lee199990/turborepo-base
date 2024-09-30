/*
 * 文件简短说明
 * @Author: 
 * @Date:   2024/1/5
 * @Last Modified by:
 * @Last Modified time: 2024/1/5 10:51
 */
import { MarkerInterface } from '../../../../widget/marker/MarkerInterface'
import type { PopupOptions } from '../../../../widget/overlay/PopupInterface'
import { MaplibrePopup } from '../overlay/Popup'
import type { LngLat } from 'maplibre-gl'
import { Marker } from 'maplibre-gl'

export class MaplibreCustomMarker extends MarkerInterface<Marker, LngLat, MaplibrePopup> {
    setup() {
        if (!this.options) {
            this.marker = new Marker()
            return
        }
        if (!this.options.url) {
            this.marker = new Marker()
            return
        }
        const el = this.options.element || this.getIcon()
        this.marker = new Marker({ anchor: 'center', element: el })
    }

    getMarker(): Marker {
        return this.marker
    }

    remove() {
        this.marker.remove()
    }

    addTo(map): this {
        if (!this.marker.getLngLat())
            this.setPosition({ lat: 0, lng: 0 } as LngLat)

        this.marker.addTo(map)
        return this
    }

    setPosition(position: LngLat): this {
        this.marker.setLngLat(position)
        return this
    }

    getPosition(): LngLat | undefined {
        return this.marker.getLngLat()
    }

    setPopup(
        map,
        content: string | HTMLElement,
        options?: PopupOptions,
    ): this {
        this.popup = new MaplibrePopup(map, options).addToMap(map).setContent(content)
        const parentElement = this.popup.getElement()?.parentElement
        if (parentElement)
            parentElement.style.zIndex = '2'

        return this
    }

    removePopup(): this {
        this.popup?.close()
        this.popup = undefined
        return this
    }

    openPopup(): this {
        this.popup?.setPosition(this.marker.getLngLat())
        this.popup?.open()
        return this
    }

    closePopup(): this {
        this.popup?.close()
        return this
    }

    closeTooltip(): this {
        this.tooltip?.close()
        return this
    }

    openTooltip(): this {
        this.tooltip?.setPosition(this.marker.getLngLat())
        this.tooltip?.open()
        return this
    }

    removeTooltip(map): this {
        this.tooltip?.close()
        this.tooltip = undefined
        return this
    }

    setTooltip(
        map,
        content: string | HTMLElement,
        options: PopupOptions | undefined,
    ): this {
        this.tooltip = new MaplibrePopup(map, options).addToMap(map).setContent(content)
        const parentElement = this.tooltip.getElement()?.parentElement
        if (parentElement)
            parentElement.style.zIndex = '2'

        return this
    }

    getTooltip(): MaplibrePopup | undefined {
        return this.tooltip
    }
}
