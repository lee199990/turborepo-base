/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/18
 * @Last Modified by:
 * @Last Modified time: 2023/12/18 16:59
 */

import { ControllerAdapter } from '../base'
import {
    DrawMode,
    DrawOption,
    FeatureStyle,
} from './type'
import type {
    Feature,
    Geometry,
    LineString,
    Point,
    Polygon,
} from 'geojson'
import { merge } from 'lodash-es'
import type { KeyboardEvent } from 'react'
import type { Observable } from 'rxjs'
import { ReplaySubject, Subject } from 'rxjs'

export abstract class DrawControllerAdapter<M> extends ControllerAdapter<M> {
    protected defaultStyle = new FeatureStyle()

    protected cancel$ = new Subject()

    protected result$ = new ReplaySubject<Feature>(1)

    // 当前的绘制选项
    protected drawOption!: DrawOption

    /**
     * 内部函数，用于监听按键
     * @param e
     * @private
     */
    private handleKey(e: Event & KeyboardEvent) {
        switch (true) {
            case e.key === 'Escape':
                this.cancel()
                break
            case e.key === 'z' && e.ctrlKey:
                this.undo()
                break
            case e.key === 'y' && e.ctrlKey:
                this.redo()
                break
            case e.key === 'Delete':
                this.trash()
                break
            default:
        }
    }

    /**
     * 内部函数，在地图初始化完成后调用，暴露其他控制器
     */
    override setup() {
        window.addEventListener(
            'keydown',
            this.handleKey.bind(this),
            { passive: true },
        )
    }

    /**
     * 监听绘制结果，返回要素
     * @return { Observable<Feature<Geometry>> }
     */
    getResult<G extends Geometry>() {
        return this.result$.pipe() as Observable<Feature<G>>
    }

    /**
     * 更新要素的样式。
     *
     * @param {Partial<FeatureStyle>} style - 包含更新样式属性的部分样式对象。
     */
    updateStyle(style: Partial<FeatureStyle>) {
        this.defaultStyle = { ...this.defaultStyle, ...style }
        this.updateLayerStyle(this.defaultStyle)
    }

    /**
     * 开始新的绘图模式。
     *
     * @template D - 绘图模式的类型。
     * @param {DrawMode} mode - 要开始的绘图模式。
     * @param {RecursivePartial<DrawOption>} [options] - 可选的绘图选项。
     * @return {this} - 当前实例。
     */
    begin<D extends DrawMode>(mode: D, options?: RecursivePartial<DrawOption>) {
        this.drawOption = merge(new DrawOption(), options)
        switch (mode) {
            case DrawMode.Point: {
                this.point(this.drawOption)
                break
            }
            case DrawMode.Line: {
                this.line(this.drawOption)
                break
            }
            case DrawMode.Circle: {
                this.circle(this.drawOption)
                break
            }
            case DrawMode.Polygon: {
                this.polygon(this.drawOption)
                break
            }
            case DrawMode.Rectangle: {
                this.rectangle(this.drawOption)
                break
            }
            default:
                console.log('暂不支持')
        }

        return this
    }

    protected abstract updateLayerStyle(style: typeof this.defaultStyle)

    /**
     * 绘制点
     *
     * @param {DrawOption} [option] - 绘制选项。
     * @return {Observable<Feature<Point>>} 点要素的观察者。
     */
    abstract point(option?: DrawOption): Observable<Feature<Point>>

    /**
     * 绘制线
     *
     * @param {DrawOption} [option] - 绘制选项。
     * @return {Observable<Feature<Point>>} 线要素的观察者。
     */
    abstract line(option?: DrawOption): Observable<Feature<LineString>>

    /**
     * 绘制圆
     *
     * @param {DrawOption} [option] - 绘制选项。
     * @return {Observable<Feature<Point>>} 多边形要素
     */
    abstract circle(option?: DrawOption): Observable<Feature<Polygon>>

    /**
     * 绘制多边形
     *
     * @param {DrawOption} [option] - 绘制选项。
     * @return {Observable<Feature<Point>>} 多边形要素
     */
    abstract polygon(option?: DrawOption): Observable<Feature<Polygon>>

    /**
     * 绘制矩形
     *
     * @param {DrawOption} [option] - 绘制选项。
     * @return {Observable<Feature<Point>>} 多边形要素
     */
    abstract rectangle(option?: DrawOption): Observable<Feature<Polygon>>

    /**
     * 重做
     */
    abstract redo(): void

    /**
     * 重做
     */
    abstract undo(): void

    /**
     * 清空画布
     */
    abstract clear(): void

    /**
     * 完成绘制，清空结果并完成监听器
     */
    abstract done(): void

    /**
     * 打开修改模式
     */
    abstract openModify(snap?: boolean): void

    /**
     * 关闭修改模式
     */
    abstract closeModify(): void

    /**
     * 编辑时删除选中的点
     * @protected
     */
    protected abstract trash(): void

    /**
     * 取消当前绘制
     */
    cancel() {
        this.cancel$.next(null)
    }

    // 内部方法，在地图销毁时会被调用
    destroy() {
        super.destroy()
        window.removeEventListener('keyup', this.handleKey.bind(this))
    }
}
