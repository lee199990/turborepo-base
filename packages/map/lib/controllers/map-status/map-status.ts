/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/14
 * @Last Modified by:
 * @Last Modified time: 2023/12/14 10:29
 */

export interface LngLat {
    lat: number
    lng: number
}

export interface MapStatusType {
    bounds: {
        northEast: LngLat
        southWest: LngLat
    }
    center: LngLat
    rotate: number
    zoomLevel: number
}

export abstract class MapStatusAdapter<M = unknown> {
    constructor(protected mapInstance: M) {}

    /**
     * 获取地图的缩放级别。
     *
     * @param {number} digits - 用于确定缩放级别的小数位数。
     * @return {number} - 缩放级别。
     */
    abstract getZoom(digits?: number): number

    /**
     * 获取地图的旋转角度。
     *
     * @param {number} digits - 用于确定旋转角度的小数位数。可选。
     * @return {number} 旋转角度。
     */
    abstract getRotate(digits?: number): number

    /**
     * 获取地图的边界，东北点坐标和西南点坐标。
     *
     * @return {{ northEast: LngLat; southWest: LngLat }} 东北点坐标和西南点坐标。
     */
    abstract getBounds(): { northEast: LngLat, southWest: LngLat }

    /**
     * 获取地图的的中心点坐标。
     *
     * @return {LngLat} 地图的的中心点坐标。
     */
    abstract getCenter(): LngLat

    /**
     * 获取地图的状态。
     *
     * @return {MapStatusType} 地图的状态。
     */
    abstract getStatus(): MapStatusType
}
