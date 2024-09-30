/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/13
 * @Last Modified by:
 * @Last Modified time: 2023/12/13 15:14
 */
import { ControllerAdapter } from '../base'

export type Lnglat = [number, number] | { lat: number, lng: number }

export abstract class LocationControllerAdapter<M = unknown> extends ControllerAdapter<M> {
    protected checkType(t) {
        return Object.prototype.toString.call(t) === '[object Array]' ? 'array' : 'LngLat'
    }

    /**
     * 定位到经纬度。
     *
     * @param {Lnglat} lnglat - 经纬度
     * @return {this} - 类的更新实例。
     */
    abstract flyTo(lnglat: Lnglat): this

    /**
     * 将地图缩放到指定等级。
     *
     * @param {number} 级别 - 要缩放到的缩放级别。
     * @return {this} - 类的更新实例。
     */
    abstract zoomTo(level: number): this

    /**
     * 将地图旋转到指定角度。
     *
     * @param {number} angle - 旋转到的角度。
     * @return {this} - 返回对象的当前实例。
     */
    abstract rotateTo(angle: number): this
}
