/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/27
 * @Last Modified by:
 * @Last Modified time: 2023/12/27 15:30
 */
import { MaplibrePopup } from '../../engine/maplibre'
import { OpenlayersPopup } from '../../engine/openlayer'
import type { PopupOptions } from './PopupInterface'

export class Popup {
    private popup: OpenlayersPopup | MaplibrePopup

    constructor(
        private map,
        private type: string,
        private options?: PopupOptions,
    ) {
        if (type === 'CustomMapLibre')
            this.popup = new MaplibrePopup(this.map, options)
        else
            this.popup = new OpenlayersPopup(this.map, options)
    }

    setPosition(position): this {
        this.popup.setPosition(position)
        return this
    }

    setContent(content: string | HTMLElement): this {
        this.popup.setContent(content)
        return this
    }

    addToMap(map) {
        this.popup.addToMap(map)
    }

    getElement() {
        return this.popup.getElement()
    }

    getPosition() {
        return this.popup.getPosition()
    }

    remove(map) {
        if (this.type === 'CustomMapLibre') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            this.popup.overlay.remove()
        }
        else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            map.removeOverlay(this.popup.overlay)
        }
    }

    open() {
        this.popup.open()
    }

    close() {
        this.popup.close()
    }
}
