/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/27
 * @Last Modified by:
 * @Last Modified time: 2023/12/27 18:16
 */
import { getTypeOfMapInstance } from '../../../util/checkTypeOfMapInstance'
import { Popup } from './Popup'
import type { PopupOptions } from './PopupInterface'

export class PopupManager {
    private popupMapper: Map<string, Popup> = new Map()

    constructor(protected map) {}

    add(id: string, options?: PopupOptions) {
        const popup = new Popup(
            this.map.instance,
            getTypeOfMapInstance(this.map),
            options,
        )
        this.popupMapper.set(id, popup)
        popup.addToMap(this.map.instance)
    }

    get(id: string) {
        return this.popupMapper.get(id)
    }

    open(id: string) {
        const popup = this.popupMapper.get(id)
        if (popup)
            popup.open()
    }

    close(id: string) {
        const popup = this.popupMapper.get(id)
        if (popup)
            popup.close()
    }

    openAll() {
        this.popupMapper.forEach((popup) => {
            popup.open()
        })
    }

    closeAll() {
        this.popupMapper.forEach((popup) => {
            popup.close()
        })
    }

    getAll() {
        return [...this.popupMapper].map(i => i)
    }

    remove(id: string) {
        const popup = this.popupMapper.get(id)
        if (popup) {
            this.popupMapper.delete(id)
            popup.remove(this.map.instance)
        }
    }

    removeAll() {
        this.popupMapper.forEach((popup) => {
            popup.remove(this.map.instance)
        })
        this.popupMapper.clear()
    }
}
