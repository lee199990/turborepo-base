/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 15:09
 */

import type { StyleOptions } from '../../utils/styleGenerator/StyleGenerator'
import type { LayerFormat, VectorType } from './type'

export interface LayerOptions {
    // 图层的边界框，超出此边界将不会加载
    bounds?: [number, number, number, number]
    // 图层的属性类型
    format: LayerFormat
    // 分组ID
    groupId?: string
    // 图层ID
    id: string
    // 图层名称
    layer: string
    // 最大显示层级
    maxZoom?: number
    // 最小显示层级
    minZoom?: number
    style?: StyleOptions
    // 多子域
    subdomains?: string[]
    // 请求地址
    url: string
    // 如果是矢量图层可配置此项，会调整显示模式如点线面，maplibre必须指定此项，否则都会以线的形式展示
    vectorType?: VectorType

    // Z轴层级
    zIndex?: number
}

export abstract class LayersOperations<M = unknown, T extends LayerOptions = LayerOptions> {
    id: string

    groupId?: string

    removed = false

    /**
     * 此图层是否被移除
     */
    get isRemoved() {
        return this.removed
    }

    // 一组函数，用来通知销毁
    protected removeMonitor: (() => void)[] = []

    constructor(protected mapInstance: M, protected options: T) {
        this.id = options.id
        this.groupId = options.groupId
    }

    /**
     * 被移除之前的回调通知
     * @param fn
     */
    beforeRemove(fn: () => void) {
        this.removeMonitor.push(fn)
    }

    // 子类调用remove时需要调用此函数
    protected destroy() {
        this.removeMonitor.forEach(fn => fn())
        this.removed = true
        this.removeMonitor.length = 0
    }

    /**
     * 内部函数，用于创建图层，此函数将由控制器调用
     * @returns { void }
     */
    abstract create(): this

    /**
     * 内部函数，将图层添加到地图
     * @returns { void }
     */
    abstract addTo(): this

    /**
     * 显示此图层
     */
    abstract show(): void

    /**
     * 隐藏此图层
     */
    abstract hide(): void

    /**
     * 移除此图层，移除后将销毁
     */
    abstract remove(): void

    /**
     * 获取原始图层，供库内部开发使用，业务层中慎用
     *
     * @return {unknown} The original layer.
     */
    abstract getOriginalLayer(): unknown
}

export type Parser<T extends LayersOperations = LayersOperations> = new (map, option) => T
