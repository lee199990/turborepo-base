/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/15
 * @Last Modified by:
 * @Last Modified time: 2023/12/15 8:47
 */

import { ScreenShotInterface } from '../../../utils/screenshot/ScreenShotInterface'
import type { Map } from 'ol'

export class OpenlayersScreenshot extends ScreenShotInterface<Map> {
    eventController(type): void {
        this.mapInstance[type]('pointerdrag', this.stopPropagation)
        this.mapInstance[type]('dblclick', this.stopPropagation)
        this.mapInstance[type]('singleclick', this.stopPropagation)
        this.mapInstance[type]('wheel', this.stopPropagation)
    }

    async getShotBounds(): Promise<{
        sx: number
        sy: number
        width: number
        height: number
    }> {
        const map = this.mapInstance
        return new Promise((resolve) => {
            this.shotBoundsElementInit()
            let top = 0
            let left = 0
            this.eventController('on')

            const mousemove = (e) => {
                const { pixel } = e
                if (pixel[0] - left < 0) {
                    this.shotBounds.style.width = `${left - pixel[0]}px`
                    this.shotBounds.style.left = `${left - (left - pixel[0])}px`
                }
                else {
                    this.shotBounds.style.left = `${left}px`
                    this.shotBounds.style.width = `${pixel[0] - left}px`
                }
                if (pixel[1] - top < 0) {
                    this.shotBounds.style.height = `${top - pixel[1]}px`
                    this.shotBounds.style.top = `${top - (top - pixel[1])}px`
                }
                else {
                    this.shotBounds.style.top = `${top}px`
                    this.shotBounds.style.height = `${pixel[1] - top}px`
                }
            }

            const endClick = (e) => {
                map.un('pointermove', mousemove)
                const { pixel } = e
                this.shotBounds.style.width = `${pixel[0] - left}px`
                this.shotBounds.style.height = `${pixel[1] - top}px`
                this.mapInstance.getViewport().style.cursor = 'auto'
                resolve({
                    height: Math.abs(pixel[1] - top),
                    sx: this.shotBounds.offsetLeft + 1,
                    sy: this.shotBounds.offsetTop + 1,
                    width: Math.abs(pixel[0] - left),
                })
            }

            const startClick = (e) => {
                const { pixel } = e
                this.shotBounds.style.top = `${pixel[1]}px`
                this.shotBounds.style.left = `${pixel[0]}px`
                top = pixel[1]
                left = pixel[0]
                map.getViewport().appendChild(this.shotBounds)
                this.events.click.push(startClick)
                this.events.click.push(endClick)
                this.events.move.push(mousemove)
                map.once('click', endClick)
                map.on('pointermove', mousemove)
            }
            map.once('click', startClick)
            this.mapInstance.getViewport().style.cursor = 'crosshair'
        })
    }

    getCanvas(): HTMLCanvasElement {
        const canvas = this.mapInstance.getViewport().querySelector('canvas')
        if (canvas)
            return canvas

        throw new Error(this.CanvasReferenceError)
    }

    clear(): void {
        this.eventController('un')
        if (this.events.click.length > 0) {
            this.mapInstance.un('click', this.events.click[0])
            this.mapInstance.un('click', this.events.click[1])
        }
        if (this.events.move.length > 0)
            this.mapInstance.un('pointermove', this.events.move[0])

        this.events.click = []
        this.events.move = []
        this.mapInstance.getViewport().style.cursor = 'auto'
        this.shotBounds.remove()
    }
}
