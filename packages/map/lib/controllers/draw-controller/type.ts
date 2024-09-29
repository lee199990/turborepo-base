/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/19
 * @Last Modified by:
 * @Last Modified time: 2023/12/19 8:21
 */
export enum DrawMode {
    Point,
    Line,
    Polygon,
    Circle,
    Rectangle,
}

export class FeatureStyle {
    radius = 8

    fillColor = 'rgba(255,165,0,0.25)'

    circleColor = '#ffa500'

    strokeColor = '#333'

    strokeWidth = 2

    dash: undefined | number[] = [3, 6]
}

export const DrawTip = {
    active: '鼠标左键添加点，鼠标左键双击完成图形，按下ESC退出绘制',
    idle: '鼠标左键开始绘制，鼠标右键取消绘制，按下ESC退出绘制',
    modify: '单击鼠标左键选择要素，拖动点位修改要素',
    show: true,
    snap: '靠近要修改的要素，拖动点位修改要素',
}

export class DrawOption {
    // 执行一次后结束
    once = true

    // 最大绘制步骤，绘制线段或多边形使用
    // max?: number;

    // 最小绘制步骤，绘制线段或多边形使用
    // min?: number;

    // 修改绘制时的样式，但不会更改最终结果
    style = new FeatureStyle()

    // 捕捉交互
    snap = true

    // 捕捉交互的图层，只支持矢量图层，默认为绘制图层
    snapLayers?: string[]

    // 绘制要素是否允许修改
    modify = true

    tip = DrawTip
}
