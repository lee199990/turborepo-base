/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/23
 * @Last Modified by:
 * @Last Modified time: 2023/12/23 10:48
 */

import { CustomMapLibre } from '../lib/engine/maplibre'
import { CustomOpenLayers } from '../lib/engine/openlayer'

export type MapInstanceType = CustomMapLibre | CustomOpenLayers

/**
 * 检查给定的对象是否为 CustomMapLibre 的实例。
 *
 * @param {object} obj - 要检查的对象。
 * @return {boolean} 如果对象是 CustomMapLibre 的实例，则返回 true；否则返回 false。
 */
export function isCustomMapLibre<T extends object>(obj: T): boolean {
    return obj instanceof CustomMapLibre
}

/**
 * 检查给定的对象是否为 CustomOpenLayers 的实例。
 *
 * @param {any} obj - 要检查的对象。
 * @return {boolean} 如果对象是 CustomOpenLayers 的实例，则返回 true；否则返回 false。
 */
export function isCustomOpenLayers(obj): boolean {
    return obj instanceof CustomOpenLayers
}

/**
 * 检查给定对象的类型并返回表示类型的字符串。
 *
 * @param {any} obj - 要检查类型的对象。
 * @return {string} 对象类型的字符串表示。
 */
export function getTypeOfMapInstance(obj): string {
    if (isCustomMapLibre(obj))
        return 'CustomMapLibre'

    if (isCustomOpenLayers(obj))
        return 'CustomOpenLayers'

    return 'unknown'
}

/**
 * 返回地图实例的类。
 *
 * @param {any} obj - 要检查实例的对象。
 * @return {any} 地图实例的类。
 */
export function getClassOfMapInstance(obj) {
    if (isCustomMapLibre(obj))
        return CustomMapLibre

    return CustomOpenLayers
}
