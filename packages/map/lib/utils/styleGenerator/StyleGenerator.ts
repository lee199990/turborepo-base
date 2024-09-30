/*
 * 文件简短说明
 * @Author: 
 * @Date:   2024/1/18
 * @Last Modified by:
 * @Last Modified time: 2024/1/18 14:20
 */

import {
    Circle,
    Fill,
    Stroke,
    Style,
} from 'ol/style'

enum VectorType {
    Circle = 'circle',
    Fill = 'fill',
    Line = 'line',
    Symbol = 'symbol',
}

export interface StyleOptions {
    'circle-color'?: string
    'circle-radius'?: number
    'fill-color'?: string
    'fill-outline-color'?: string
    'fill-outline-dash'?: number[]
    'fill-outline-width'?: number
    'line-color'?: string
    'line-dash'?: number[]
    'line-width'?: number
}

export class StyleGenerator {
    constructor(private vectorType: VectorType | undefined, private options: StyleOptions | undefined) {}

    openlayersStyle(feature) {
        let type = ''
        if (feature.getType)
            type = feature.getType()
        else if (feature.getGeometry && feature.getGeometry().getType)
            type = feature.getGeometry().getType()

        let style
        let styleObj = new Style()
        try {
            style = this.options || {}
        }
        catch (e) {
            if (
                (e as Error).message === 'Cannot read properties of undefined (reading \'options\')'
            ) {
                console.error('openlayersStyle 函数 this 指向错误。解决方法如下：\n'
                + '1.使用 bind 方法为函数绑定 StyleGenerator 实例，例如：styleGenerator.openlayersStyle.bind(styleGenerator)\n'
                + '2.使用箭头函数进行包裹，例如：feature => styleGenerator.openlayersStyle(feature)')

                return [styleObj]
            }
        }
        // 点
        if (type === 'Point' || type === 'MultiPoint' || type === 'circle')
            styleObj = new Style({ image: new Circle({ fill: new Fill({ color: style['circle-color'] || '#ffa500' }), radius: style['circle-radius'] || 5 }) })

        // 线
        if (type === 'LineString' || type === 'MultiLineString' || type === 'Line') {
            styleObj = new Style({ stroke: new Stroke({
                color: style['line-color'] || '#274f9d',
                lineDash: style['line-dash'] || [],
                width: style['line-width'] || 2,
            }) })
        }

        // 多边形
        if (type === 'Polygon' || type === 'MultiPolygon') {
            styleObj = new Style({ fill: new Fill({ color: style['fill-color'] || 'rgba(108,154,230,0.75)' }), stroke: new Stroke({
                color: style['fill-outline-color'] || '#0b1f45',
                lineDash: style['fill-outline-dash'] || [],
                width: style['fill-outline-width'] || 1,
            }) })
        }

        // 返回 style 数组
        return [styleObj]
    }

    maplibrePaint() {
        console.log(456)
        const vectorType = this.vectorType
        const style = this.options || {}

        switch (vectorType) {
            case VectorType.Circle:
                return { 'circle-color': style['circle-color'] || '#ffa500', 'circle-radius': style['circle-radius'] || 5 }
                break
            case VectorType.Line:
                return {
                    'line-color': style['line-color'] || '#274f9d',
                    'line-dasharray': style['line-dash'] || [0, 0],
                    'line-width': style['line-width'] || 2,
                }
                break
            case VectorType.Fill:
                return { 'fill-color': style['fill-color'] || 'rgba(108,154,230,0.75)', 'fill-outline-color': style['fill-outline-color'] || '#0b1f45' }
                break
            default:
                return {}
        }
    }
}
