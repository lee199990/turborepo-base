/*
 * 文件简短说明
 * @Author:
 * @Date:   2023/12/21
 * @Last Modified by:
 * @Last Modified time: 2023/12/21 19:18
 */

import type { MapInstanceType } from '../../../util/checkTypeOfMapInstance'
import { getTypeOfMapInstance } from '../../../util/checkTypeOfMapInstance'
import { isCustomMapLibre } from '../../../util/isCustomMapLibre'
import { MaplibreScreenshot } from '../../engine/maplibre/screenshot/maplibreScreenshot'
import { OpenlayersScreenshot } from '../../engine/openlayer/screenshot/openlayersScreenshot'

export class Screenshot {
    private isShooting = false

    private shotInstance!: MaplibreScreenshot | OpenlayersScreenshot

    constructor(private map: MapInstanceType) {
        if (getTypeOfMapInstance(map) === 'unknown')
            throw new Error('未知的地图类型, 请检查构造器传入参数是否正确')
        else
            this.shotInstanceInit(map.instance)
    }

    private shotInstanceInit(instance) {
        this.shotInstance = isCustomMapLibre(this.map)
            ? new MaplibreScreenshot(instance)
            : new OpenlayersScreenshot(instance)
    }

    /**
     * 生成指定区域 canvas 的截图。
     *
     * @param {{ sx: number, sy: number, width: number, height: number }} params - 用于指定截图区域的参数。
     * @param {HTMLCanvasElement} mapCanvas - 用于截图的画布元素。
     * @return {string} 如果成功，则返回截图的数据URL，否则返回'截图失败'。
     */
    private screenShot({
        height,
sx,
sy,
width,
    }, mapCanvas: HTMLCanvasElement): string {
        const canvas = document.createElement('canvas') // 创建canvas元素
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')

        if (ctx && mapCanvas) {
            ctx.drawImage(
                mapCanvas,
                sx,
                sy,
                width,
                height,
                0,
                0,
                width,
                height,
            ) // 将图片绘制到canvas中
            return canvas.toDataURL() // 转换图片为dataURL
        }
        return '截图失败'
    }

    /**
     * 下载图片组件。
     *
     * @param {string} dataUrl - 图片的数据 URL。
     * @return {Promise} - 同步状态到上一层，方便处理后续操作
     */
    private downloadImgComponent(dataUrl: string): void {
        const shotBounds = document.getElementById('shotBounds')
        if (shotBounds) {
            shotBounds.style.pointerEvents = 'all'
            shotBounds.style.backgroundImage = `url(${dataUrl})`
            shotBounds.style.boxShadow = '0 0 50px rgba(0,0,0,0.5)'

            const btnList = { no: {
                click: () => {
                    this.clear()
                },
                element: document.createElement('button'),
                style: 'position:absolute;bottom:-30px;right:80px;',
                text: '取消',
            }, yes: {
                click: () => {
                    shotBounds.remove()
                    const link = document.createElement('a')
                    link.href = dataUrl
                    link.download = 'map_screenshot.png'
                    link.click()
                    this.clear()
                },
                element: document.createElement('button'),
                style: 'position:absolute;bottom:-30px;right:0;',
                text: '保存截图',
            } }

            const btnListNames = Object.getOwnPropertyNames(btnList)
            btnListNames.forEach((item) => {
                const btn = btnList[item]
                btn.element.innerText = btn.text
                btn.element.style.cssText = btn.style
                btn.element.onclick = btn.click
                shotBounds.appendChild(btn.element)
            })
        }
    }

    private escapeEvent = (event) => {
        if (event.code === 'Escape')
            this.clear()
    }

    /**
     * 获取选中地图视图的截图并下载。
     *
     * @return {Promise<void>}
     */
    public async getScreenShot(): Promise<void> {
        this.isShooting = !this.isShooting
        if (this.isShooting) {
            document.addEventListener('keydown', this.escapeEvent)
            const bounds = await this.shotInstance.getShotBounds()
            const mapCanvas = this.getCanvas()
            if (!mapCanvas)
                return
            const dataUrl = this.screenShot(bounds, mapCanvas)
            this.downloadImgComponent(dataUrl)
        }
        else {
            this.clear()
        }
    }

    /**
     * 获取选中地图视图截图的 URL。
     *
     * @param {Function} callback - 可选的回调函数，用于传递数据 URL。
     * @return {Promise<string>} - 返回一个解析为数据 URL 的 Promise。
     */
    public async getScreenShotUrl(callback?): Promise<string> {
        const bounds = await this.shotInstance.getShotBounds()
        return new Promise((resolve) => {
            const mapCanvas = this.getCanvas()
            if (!mapCanvas)
                return
            const dataUrl = this.screenShot(bounds, mapCanvas)
            this.clear()
            if (callback)
                callback(dataUrl)
            else
                resolve(dataUrl)
        })
    }

    private getCanvas() {
        try {
            return this.shotInstance.getCanvas()
        }
        catch (error) {
            this.clear()

            console.log((error as Error).message)
            return null
        }
    }

    private clear() {
        this.isShooting = false
        this.shotInstance.clear()
        document.removeEventListener('keydown', this.escapeEvent)
    }
}

export function screenShot(map: MapInstanceType) {
    return new Screenshot(map)
}
