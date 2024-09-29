/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/15
 * @Last Modified by:
 * @Last Modified time: 2023/12/15 8:47
 */

import { ScreenShotInterface } from '../../../utils/screenshot/ScreenShotInterface'
import type { Map } from 'maplibre-gl'

export class MaplibreScreenshot extends ScreenShotInterface<Map> {
    eventController(type): void {
        this.mapInstance[type]('dblclick', this.stopPropagation)
        this.mapInstance[type]('wheel', this.stopPropagation)
        this.mapInstance[type]('mousedown', this.stopPropagation)
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
            const maplibreglCanvasContainer = this.mapInstance
                .getContainer()
                .querySelector('.maplibregl-canvas-container') as HTMLElement

            const mousemove = (e) => {
                const { point } = e
                if (point.x - left < 0) {
                    this.shotBounds.style.width = `${left - point.x}px`
                    this.shotBounds.style.left = `${left - (left - point.x)}px`
                }
                else {
                    this.shotBounds.style.left = `${left}px`
                    this.shotBounds.style.width = `${point.x - left}px`
                }
                if (point.y - top < 0) {
                    this.shotBounds.style.height = `${top - point.y}px`
                    this.shotBounds.style.top = `${top - (top - point.y)}px`
                }
                else {
                    this.shotBounds.style.top = `${top}px`
                    this.shotBounds.style.height = `${point.y - top}px`
                }
            }

            const endClick = (e) => {
                map.off('mousemove', mousemove)
                const { point } = e
                this.shotBounds.style.width = `${point.x - left}px`
                this.shotBounds.style.height = `${point.y - top}px`
                maplibreglCanvasContainer.style.cursor = 'auto'
                resolve({
                    height: Math.abs(point.y - top),
                    sx: this.shotBounds.offsetLeft - 1,
                    sy: this.shotBounds.offsetTop - 1,
                    width: Math.abs(point.x - left),
                })
            }

            const startClick = (e) => {
                const { point } = e
                this.shotBounds.style.top = `${point.y}px`
                this.shotBounds.style.left = `${point.x}px`
                top = point.y
                left = point.x
                map.getContainer().appendChild(this.shotBounds)
                this.events.click.push(startClick)
                this.events.click.push(endClick)
                this.events.move.push(mousemove)
                map.once('click', endClick)
                map.on('mousemove', mousemove)
            }
            map.once('click', startClick)
            maplibreglCanvasContainer.style.cursor = 'crosshair'
        })
    }

    getCanvas(): HTMLCanvasElement {
        const canvas = this.mapInstance.getCanvas()
        if (canvas)
            return canvas

        throw new Error(this.CanvasReferenceError)
    }

    clear(): void {
        this.eventController('off')
        if (this.events.click.length > 0) {
            this.mapInstance.off('click', this.events.click[0])
            this.mapInstance.off('click', this.events.click[1])
        }
        if (this.events.move.length > 0)
            this.mapInstance.off('mousemove', this.events.move[0])

        this.events.click = []
        this.events.move = []
        this.mapInstance.getContainer().style.cursor = 'auto'
        this.shotBounds.remove()
    }
}
