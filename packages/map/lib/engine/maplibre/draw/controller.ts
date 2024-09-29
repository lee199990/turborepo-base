/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/23
 * @Last Modified by:
 * @Last Modified time: 2023/12/23 9:04
 */
import {
    DrawControllerAdapter,
    DrawOption,
    FeatureStyle,
} from '../../../controllers'
import { controller } from '../../../controllers/decorator'
import './draw.scss'
import { CircleMode } from './modes/circle'
import { LineMode } from './modes/line'
import { PointMode } from './modes/point'
import { PolygonMode } from './modes/polygon'
import { RectangleMode } from './modes/rectangle'
import { StaticMode } from './modes/static'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import {
    Feature,
    LineString,
    Point,
    Polygon,
} from 'geojson'
import { Map } from 'maplibre-gl'

@controller('CustomMapLibre')
export class DrawController extends DrawControllerAdapter<Map> {
    private activeDraw!: MapboxDraw

    private features: Feature[] = []

    private featuresBackup: Feature[] = []

    private createDraw(style?: FeatureStyle) {
        const draw = new MapboxDraw({
            defaultMode: 'static',
            displayControlsDefault: false,
            modes: {
                ...MapboxDraw.modes,
                circle: CircleMode,
                line: LineMode,
                point: PointMode,
                polygon: PolygonMode,
                rectangle: RectangleMode,
                static: StaticMode,
            },
            styles: this.getStyle(style),
            userProperties: true,
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.mapInstance.addControl(draw, 'top-left')
        this.mapInstance.on('draw.create', this.handleCreated)
        this.mapInstance.on('draw.update', this.handleCreated)
        this.activeDraw = draw
    }

    setup() {
        super.setup()
        // 插件目前对maplibre支持有问题，替换插件中的部分设置
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        MapboxDraw.constants.classes.CONTROL_BASE = 'maplibregl-ctrl'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group'
        this.createDraw()
        this.cancel$.subscribe(() => {
            const mode = this.activeDraw.getMode()
            if (mode === 'simple_select' || mode === 'direct_select')
                this.activeDraw.changeMode('static')
        })
    }

    private getStyle(style?: FeatureStyle) {
        const {
            circleColor,
            dash,
            fillColor,
            radius,
            strokeColor,
            strokeWidth,
        } = { ...this.defaultStyle, ...style }
        return [
            {
                filter: [
                    'all',
                    [
                        '==',
                        'meta',
                        'feature',
                    ],
                    [
                        '!=',
                        'user_circle',
                        'true',
                    ],
                ],
                id: 'draw-circle-glow',
                paint: { 'circle-color': strokeColor, 'circle-radius': radius + strokeWidth / 2 },
                type: 'circle',
            },
            {
                filter: [
                    'all',
                    [
                        '==',
                        'active',
                        'true',
                    ],
                    [
                        '==',
                        'meta',
                        'feature',
                    ],
                    [
                        '!=',
                        'user_circle',
                        'true',
                    ],
                ],
                id: 'draw-circle-active',
                paint: { 'circle-color': strokeColor, 'circle-radius': radius + strokeWidth },
                type: 'circle',
            },
            {
                filter: ['all', [
                    '!=',
                    'user_circle',
                    'true',
                ]],
                id: 'draw-circle',
                paint: { 'circle-color': circleColor, 'circle-radius': radius },
                type: 'circle',
            },
            {
                filter: [
                    'all',
                    [
                        '==',
                        'meta',
                        'feature',
                    ],
                    [
                        '!=',
                        'user_guide',
                        'true',
                    ],
                ],
                id: 'draw-line',
                layout: { 'line-cap': 'round', 'line-join': 'round' },
                paint: {
                    'line-color': strokeColor,
                    // 与openlayer的大小表现一致
                    'line-dasharray': dash?.map(d => d / 2),
                    'line-width': strokeWidth,
                },
                type: 'line',
            },
            {
                filter: ['all', [
                    '==',
                    'user_guide',
                    'true',
                ]],
                id: 'guide-line',
                layout: { 'line-cap': 'round', 'line-join': 'round' },
                paint: {
                    'line-color': '#ff6262',
                    'line-dasharray': [5, 5],
                    'line-width': 2,
                },
                type: 'line',
            },
            {
                filter: ['all', [
                    '==',
                    '$type',
                    'Polygon',
                ]],
                id: 'draw-polygon',
                paint: { 'fill-color': fillColor, 'fill-outline-color': strokeColor },
                type: 'fill',
            },
        ]
    }

    private handleCreated = (event: { features: Feature[] }) => {
        this.features = this.features.concat(event.features)
        this.featuresBackup = [...this.features]
    }

    closeModify() {
        this.activeDraw.changeMode('static')
    }

    openModify(snap: boolean | undefined) {
        console.log(`编辑时的吸附功能尚未实现`)
        this.activeDraw.changeMode('simple_select')
    }

    point(option?: DrawOption) {
        this.activeDraw.changeMode('point', { ...option })
        return this.getResult<Point>()
    }

    line(option: DrawOption | undefined) {
        // const draw = this.creteDraw('draw_line_string');
        this.activeDraw.changeMode('line', { ...option })
        return this.getResult<LineString>()
    }

    circle(option: DrawOption | undefined) {
        this.activeDraw.changeMode('circle', { ...option })
        return this.getResult<Polygon>()
    }

    polygon(option: DrawOption | undefined) {
        this.activeDraw.changeMode('polygon', { ...option })
        return this.getResult<Polygon>()
    }

    rectangle(option: DrawOption | undefined) {
        this.activeDraw.changeMode('rectangle', { ...option })
        return this.getResult<Polygon>()
    }

    redo() {
        if (this.featuresBackup.length === 0)
            return

        if (this.featuresBackup.length <= this.features.length)
            return

        const redoItem = this.featuresBackup[this.features.length]
        this.activeDraw.add(redoItem)
        this.features.push(redoItem)
    }

    undo() {
        if (this.features.length === 0)
            return

        const last = this.features.pop()
        if (last)
            this.activeDraw.delete([last.id as string])
    }

    clear() {
        this.activeDraw?.deleteAll()
    }

    protected trash() {
        const mode = this.activeDraw.getMode()
        if (mode === 'simple_select' || mode === 'direct_select')
            this.activeDraw.trash()
    }

    protected updateLayerStyle(style: FeatureStyle) {
        this.activeDraw.changeMode('static')
        const features = this.activeDraw.getAll()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.mapInstance.removeControl(this.activeDraw)
        this.createDraw(style)
        this.activeDraw.set(features)
    }

    done() {
        this.clear()
        this.activeDraw?.changeMode('static')
        this.mapInstance.off('draw.create', this.handleCreated)
    }

    destroy() {
        super.destroy()
        this.done()
    }
}
