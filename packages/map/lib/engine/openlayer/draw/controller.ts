/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/18
 * @Last Modified by:
 * @Last Modified time: 2023/12/18 17:02
 */
import {
    ControllerName,
    DrawControllerAdapter,
    DrawOption,
    FeatureStyle,
} from '../../../controllers'
import { controller } from '../../../controllers/decorator'
import { LayersController } from '../layers/controller'
import './draw.scss'
import {
    LineString as TLineString,
    Point as TPoint,
    Polygon as TPolygon,
} from 'geojson'
import { isNil } from 'lodash-es'
import {
    Feature,
    Map,
    MapBrowserEvent,
    Overlay,
} from 'ol'
import { GeoJSON } from 'ol/format'
import {
    Circle,
    LineString,
    Point,
    Polygon,
} from 'ol/geom'
import { Type } from 'ol/geom/Geometry'
import { fromCircle } from 'ol/geom/Polygon'
import {
    Draw,
    Modify,
    Snap,
} from 'ol/interaction'
import {
    GeometryFunction,
    Options,
    createBox,
} from 'ol/interaction/Draw'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { take } from 'rxjs'

type DrawFeature = Feature<LineString | Point | Circle | Polygon>

@controller('CustomOpenLayers')
export class DrawController extends DrawControllerAdapter<Map> {
    private layer!: VectorLayer<VectorSource>

    private activeDraw?: Draw

    private features: DrawFeature[] = []

    private featuresBackup: DrawFeature[] = []

    isModify: { snap?: Snap, modify?: Modify } = {}

    private tooltip?: Overlay

    private getStyle(style?: Partial<FeatureStyle>): ConstructorParameters<typeof Draw>[0]['style'] {
        const {
            circleColor,
            dash,
            fillColor,
            radius,
            strokeColor,
            strokeWidth,
        } = { ...this.defaultStyle, ...style }
        const styleLike = {
            'circle-fill-color': circleColor,
            'circle-radius': radius,
            'fill-color': fillColor,
            'stroke-color': strokeColor,
            'stroke-width': strokeWidth,
        }
        if (dash && dash.length >= 2)
            styleLike['stroke-line-dash'] = dash

        return styleLike
    }

    private createHelpTooltip() {
        const element = document.createElement('div')
        element.className = 'map-draw-tooltip'
        element.innerText = this.drawOption.tip.idle
        const tooltip = new Overlay({
            element,
            offset: [15, 0],
            positioning: 'center-left',
        })
        this.tooltip = tooltip
        this.mapInstance.addOverlay(tooltip)
        return tooltip
    }

    protected updateLayerStyle(style: FeatureStyle) {
        this.layer.setStyle(this.getStyle(style))
    }

    setup() {
        super.setup()
        const layer = this.getControl<LayersController>(ControllerName.Layer)?.emptyVector('draw')
        if (layer === undefined)
            throw new Error('无法初始化绘制图层')

        layer.setStyle(this.getStyle())
        const source = layer.getSource()
        if (isNil(source))
            throw new Error('无法获取绘制图层源')

        this.layer = layer
        this.cancel$.subscribe(() => {
            this.reset()
        })
    }

    protected contextmenu(e: MouseEvent) {
        e.preventDefault()
        if (this.activeDraw)
            this.activeDraw.abortDrawing()
    }

    private addModify() {
        const source = this.layer.getSource()
        if (isNil(source))
            return

        const modify = new Modify({ source })
        this.isModify.modify = modify
        this.mapInstance.addInteraction(modify)
    }

    private addSnap() {
        const source = this.layer.getSource()
        if (isNil(source))
            return

        const snap = new Snap({ source })
        this.isModify.snap = snap
        this.mapInstance.addInteraction(snap)
    }

    private handleTooltip(evt: MapBrowserEvent<PointerEvent>) {
        if (evt.dragging && this.tooltip === undefined)
            return

        this.tooltip?.setPosition(evt.coordinate)
    }

    protected createDraw(
        type: Type,
        option?: DrawOption,
        createGeometry?: GeometryFunction,
    ): Draw {
        this.reset()
        const drawOption = option ?? new DrawOption()
        // 创建初始draw配置
        const initOption: Options = {
            // 取消右键绘制
            condition: e => e.originalEvent.buttons === 1,
            source: this.layer.getSource() as VectorSource,
            style: this.getStyle(drawOption.style),
            type,
        }
        if (createGeometry)
            initOption.geometryFunction = createGeometry

        const draw = new Draw(initOption)
        if (option?.tip.show) {
            // 鼠标提示
            this.createHelpTooltip()
            // 更新鼠标提示框位置
            this.mapInstance.on('pointermove', this.handleTooltip.bind(this))
        }

        // 右键取消
        window.addEventListener('contextmenu', this.contextmenu.bind(this))
        this.mapInstance.addInteraction(draw)

        draw.on('drawstart', ({ feature }) => {
            this.features.push(feature as DrawFeature)
            this.featuresBackup = [...this.features]
            feature.getGeometry()?.once('change', () => {
                if (this.tooltip)
                    this.tooltip.getElement()!.innerText = this.drawOption.tip.active
            })
        })
        draw.once('drawend', ({ feature }) => {
            if (drawOption.once)
                this.reset()

            const type = feature.getGeometry()?.getType()
            if (type === 'Circle') {
                // 圆转换成几何
                const polygon = fromCircle(feature.getGeometry() as Circle)
                this.result$.next(JSON.parse(new GeoJSON().writeFeature(new Feature(polygon))))
                return
            }
            this.result$.next(JSON.parse(new GeoJSON().writeFeature(feature)))
        })

        this.activeDraw = draw
        if (drawOption.modify)
            this.addModify()

        if (drawOption.snap)
            this.addSnap()

        return draw
    }

    protected trash() {
        console.warn('尚未实现')
    }

    openModify(snap: boolean) {
        this.closeModify()
        this.addModify()
        if (snap)
            this.addSnap()
    }

    closeModify() {
        const { modify, snap } = this.isModify
        if (snap)
            this.mapInstance.removeInteraction(snap)

        if (modify)
            this.mapInstance.removeInteraction(modify)
    }

    undo() {
        if (this.features.length === 0)
            return

        const last = this.features.pop()
        if (last)
            this.layer.getSource()?.removeFeature(last)
    }

    redo() {
        if (this.featuresBackup.length === 0)
            return

        if (this.featuresBackup.length <= this.features.length)
            return

        const redoItem = this.featuresBackup[this.features.length]
        this.layer.getSource()?.addFeature(redoItem)
        this.features.push(redoItem)
    }

    point(option?: DrawOption) {
        this.createDraw('Point', option)
        return this.getResult<TPoint>().pipe(take(1))
    }

    line(option?: DrawOption) {
        this.mapInstance.addInteraction(this.createDraw('LineString', option))
        return this.getResult<TLineString>().pipe(take(1))
    }

    circle(option?: DrawOption) {
        this.mapInstance.addInteraction(this.createDraw('Circle', option))
        return this.getResult<TPolygon>().pipe(take(1))
    }

    polygon(option?: DrawOption) {
        this.mapInstance.addInteraction(this.createDraw('Polygon', option))
        return this.getResult<TPolygon>().pipe(take(1))
    }

    rectangle(option?: DrawOption) {
        this.mapInstance.addInteraction(this.createDraw(
            'Circle',
            option,
            createBox(),
        ))
        return this.getResult<TPolygon>().pipe(take(1))
    }

    private reset() {
        if (this.tooltip)
            this.mapInstance.removeOverlay(this.tooltip)

        window.removeEventListener('contextmenu', this.contextmenu.bind(this))
        if (this.activeDraw !== undefined) {
            this.activeDraw.abortDrawing()
            this.mapInstance.removeInteraction(this.activeDraw)
        }
        this.activeDraw = undefined
    }

    done() {
        this.clear()
        this.closeModify()
        this.reset()
    }

    clear() {
        this.layer?.getSource()?.clear()
    }

    destroy() {
        super.destroy()
        this.done()
    }
}
