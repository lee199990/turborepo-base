/*
 * 文件简短说明
 * @Author:
 * @Date:   2023/12/22
 * @Last Modified by:
 * @Last Modified time: 2023/12/22 9:32
 */

interface Events {
    click: Array<(...ars) => void>
    move: Array<(...ars) => void>
}

export abstract class ScreenShotInterface<M> {
    protected CanvasReferenceError: string = '地图的 canvas 不存在，截图功能无法使用。'

    protected events: Events = { click: [], move: [] }

    protected shotBounds!: HTMLElement

    constructor(protected mapInstance: M) {}

    /**
     * 初始化 shotBoundsElement。
     *
     * @return {void}
     */
    protected shotBoundsElementInit() {
        this.shotBounds?.remove()
        this.shotBounds = document.createElement('div')
        this.shotBounds.id = 'shotBounds'
        this.shotBounds.style.cssText
            = 'position:absolute;box-sizing:border-box;background-color:rgba(0,0,0,0.1);border:1px solid black;pointer-events:none;'
    }

    /**
     * 阻止事件传播，阻止捕获或冒泡
     * @param e 事件对象
     * @protected
     */
    protected stopPropagation(e): void {
        if (e.stopPropagation)
            e.stopPropagation()
        else
            e.preventDefault()
    }

    /**
     * 控制地图原生方法，防止截图是屏幕有移动。
     *
     * @param {type} type - on or [un, off]。
     * @return {void} 该函数不返回任何内容。
     */
    abstract eventController(type: string): void

    /**
     * 获取截图的边界。
     *
     * @return {Promise<{sx: number, sy: number, width: number, height: number}>} 一个返回截图边界的 Promise。
     */
    abstract getShotBounds(
        shotBounds: HTMLElement
    ): Promise<{ sx: number, sy: number, width: number, height: number }>

    /**
     * 获取地图画布元素。
     *
     * @return {HTMLCanvasElement} 地图画布元素。
     */
    abstract getCanvas(): HTMLCanvasElement

    /**
     * 中断截图状态，移除事件监听器，并重置事件数组。
     * @return {void}
     */
    abstract clear(): void
}
