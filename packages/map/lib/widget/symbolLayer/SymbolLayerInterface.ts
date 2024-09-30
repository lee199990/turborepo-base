/*
 * 文件简短说明
 * @Author: 
 * @Date:   2024/1/12
 * @Last Modified by:
 * @Last Modified time: 2024/1/12 9:59
 */

export type AnchorType =
    | 'center'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'

export interface Options {
    anchor?: AnchorType
    id: string
    scale?: number
    url: string
}

export interface PointOptions {
    coordinates: number[]
    id: string
    properties: object
}
export type Points = PointOptions[]

export abstract class SymbolLayerInterface<M, C> {
    protected pointLayer

    protected clickCallback

    constructor(protected map: M, protected options: Options) {
        this.setup()
    }

    /**
     * 初始化。
     *
     * @return {void}。
     */
    abstract setup()

    /**
     * 获取图层。
     *
     * @return {type} 图层。
     */
    abstract getLayer()

    /**
     * 向图层中添加点要素
     *
     * @param {string} id - 点的 ID。
     * @param {C} coordinate - 点的坐标。
     * @param {any} properties - 点的附加属性。
     */
    abstract addPoint(id: string, coordinate: C, properties)

    /**
     * 向图层中添加多个点。
     *
     * @param {Points} points - 要添加点的集合。
     */
    abstract addPoints(points: Points)

    /**
     * 删除对应 ID 的点要素。
     *
     * @param {string} id - 要删除的点的 ID。
     */
    abstract removePoint(id: string)

    /**
     * 从图层中移除所有点。
     *
     * @return {void}
     */
    abstract removeAllPoints()

    /**
     * 向图层中添加点要素，使用 GeoJSON 格式
     *
     * @param {any} feature - 要添加的点要素。
     */
    abstract addFeature(feature)

    /**
     * 向图层中添加多个点要素，使用 GeoJSON 格式
     *
     * @param {any} feature - 要添加的点要素。
     */
    abstract addFeatures(features)

    // abstract bringToFront();
    //
    // abstract bringToBack();
    //
    // abstract setZIndex(zIndex: number);

    /**
     * 绑定点击事件到图层，并在点击时执行提供的回调函数。
     *
     * @param {Function} callback - 点击时要执行的函数。
     */
    abstract bindClick(callback)

    /**
     * 从图层中移除点击事件。
     *
     * @return {void}
     */
    abstract removeClick()
}
