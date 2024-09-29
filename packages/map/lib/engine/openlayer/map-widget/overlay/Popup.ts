/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/27
 * @Last Modified by:
 * @Last Modified time: 2023/12/27 9:05
 */

import { PopupInterface } from '../../../../widget/overlay/PopupInterface'
import './style.scss'
import type { Map } from 'ol'
import { Overlay } from 'ol'
import type { Coordinate } from 'ol/coordinate'
import type { Positioning } from 'ol/Overlay'

const positioningOffset = {
    'bottom-center': [0, -10],
    'bottom-left': [-20, -10],
    'bottom-right': [20, -10],
    'center-center': [0, 0],
    'center-left': [10, 0],
    'center-right': [-10, 0],
    'top-center': [0, 10],
    'top-left': [-20, 10],
    'top-right': [20, 10],
}

const targetPosition = {
    'bottom': 'bottom-center',
    'bottom-left': 'bottom-left',
    'bottom-right': 'bottom-right',
    'center': 'center-center',
    'left': 'center-left',
    'right': 'center-right',
    'top': 'top-center',
    'top-left': 'top-left',
    'top-right': 'top-right',
}

export class OpenlayersPopup extends PopupInterface<Map, Overlay, Coordinate> {
    isOpen = false

    init() {
        let positioning: string = this.options?.positioning || 'bottom'
        positioning = targetPosition[positioning]
        const container = document.createElement('div')
        container.classList.add('popup', positioning)
        if (this.options?.className)
            container.classList.add(this.options?.className)

        this.contentDiv = document.createElement('div')
        container.append(this.contentDiv)
        if (!this.options?.removeCloseButton)
            container.append(this.setCloseButton())
        let offset = positioningOffset[positioning]
        if (this.options && this.options.offset)
            offset = [positioningOffset[positioning][0] + this.options?.offset[0], positioningOffset[positioning][1] + this.options?.offset[1]]

        // 创建Overlay对象
        this.overlay = new Overlay({
            element: container,
            offset,
            positioning: positioning as Positioning,
            stopEvent: true,
        })

        container.style.maxWidth = this.options?.maxWidth ? `${this.options?.maxWidth}px` : '300px'
    }

    private setCloseButton() {
        const closer = document.createElement('a')
        closer.classList.add('popup-closer')
        closer.onclick = (e) => {
            this.close()
            closer.blur()
            return false
        }

        return closer
    }

    setPosition(position: Coordinate) {
        this.position = position
        this.open()
    }

    setContent(content: string | HTMLElement): this {
        this.content = content
        if (typeof content === 'string')
            this.contentDiv.innerHTML = content
        else
            this.contentDiv.append(content)

        this.open()

        return this
    }

    getPosition(): Coordinate | undefined {
        return this.overlay.getPosition()
    }

    getElement() {
        return this.overlay.getElement()
    }

    addToMap(map): this {
        map.addOverlay(this.overlay)
        return this
    }

    open() {
        this.overlay.setPosition(this.position)
    }

    close() {
        this.overlay.setPosition(undefined)
    }
}
