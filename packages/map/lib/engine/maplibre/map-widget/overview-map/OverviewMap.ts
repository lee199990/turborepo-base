/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/21
 * @Last Modified by:
 * @Last Modified time: 2023/12/21 10:56
 */

import '../../../../widget/overviewMap/overviewMap.scss'
import type { OverviewMapOptions } from '../../../../widget/overviewMap/overviewMapInterface'
import type { Source } from 'maplibre-gl'
import {
    LngLat,
    LngLatBounds,
    Map,
} from 'maplibre-gl'

interface ISource extends Source {
    _data: {
        type: string
        geometry: {
            coordinates: number[][][]
        }
    }
    setData: (data) => void
}
interface Bounds extends LngLatBounds {
    _ne: LngLat
    _sw: LngLat
}
const difference = 5

export class OverviewMap {
    private containerID = 'overviewmap-map'

    // 总览地图是否在拖动，控制双亲地图对总览地图的干扰
    private isDragging = false

    private isCollapsed: boolean = false

    private overviewMap!: Map

    private overviewMapElement!: HTMLElement

    private previousPoint = [0, 0]

    private currentPoint = [0, 0]

    constructor(protected parentMap: Map, protected overviewMapOptions: OverviewMapOptions) {
        this.initialize()
    }

    /**
     * 初始化总览地图的容器
     *
     * @return {void}
     */
    private initialize(): void {
        const overviewmapList = this.parentMap.getContainer().querySelectorAll('.overviewmap')
        if (overviewmapList.length > 0) {
            overviewmapList.forEach((item) => {
                item.remove()
            })
        }
        this.overviewMapElement = document.createElement('div')
        this.overviewMapElement.className = `overviewmap ${this.overviewMapOptions.className}`
        const container = document.createElement('div')
        container.id = this.containerID

        this.isCollapsed = !!this.overviewMapOptions.collapsed

        if (this.overviewMapOptions.collapsed && this.overviewMapOptions.collapsible)
            this.close()
        else
            this.open()

        if (this.overviewMapOptions.collapsible)
            this.addOverviewMapBtn()

        this.overviewMapElement.appendChild(container)
        this.parentMap.getContainer().appendChild(this.overviewMapElement)
    }

    private open(): void {
        this.overviewMapElement.style.width = `${this.overviewMapOptions.width}px`
        this.overviewMapElement.style.height = `${this.overviewMapOptions.height}px`
        this.overviewMapElement.classList.remove('overviewmap-collapsed')
        this.isCollapsed = false
        this.overviewMap.setZoom(this.parentMap.getZoom() - difference)
        this.overviewMap.setCenter(this.parentMap.getCenter())
        this.setTrackingRectBounds()
    }

    private close(): void {
        this.overviewMapElement.style.width = 'auto'
        this.overviewMapElement.style.height = 'auto'
        this.overviewMapElement.classList.add('overviewmap-collapsed')
        this.isCollapsed = true
    }

    private addOverviewMapBtn(): void {
        const btn = document.createElement('button')
        btn.className = 'overviewmap-button'
        btn.innerText = this.overviewMapOptions.collapsed ? '›' : '‹'
        btn.addEventListener('click', (e) => {
            const text = (e.target as HTMLElement).innerText
            if (text === '›') {
                (e.target as HTMLElement).innerText = '‹'
                this.open()
            }
            else {
                (e.target as HTMLElement).innerText = '›'
                this.close()
            }
        })
        this.overviewMapElement.appendChild(btn)
    }

    /**
     * 此函数禁用概览地图上的拖动平移、滚动缩放、双击缩放、框选缩放、触摸缩放旋转、触摸俯仰、拖动旋转等事件。
     *
     * @private
     */
    private disableOverviewMapEvents(): void {
        this.overviewMap.dragPan.disable()
        this.overviewMap.scrollZoom.disable()
        this.overviewMap.doubleClickZoom.disable()
        this.overviewMap.boxZoom.disable()
        this.overviewMap.touchZoomRotate.disable()
        this.overviewMap.keyboard.enable()
        this.overviewMap.touchPitch.disable()
        this.overviewMap.dragRotate.disable()
    }

    private setEvents(): void {
        this.parentMap.on('resize', this.parentMapEventListener.bind(this))
        this.parentMap.on('zoom', this.parentMapEventListener.bind(this))
        this.parentMap.on('move', this.parentMapEventListener.bind(this))
        this.overviewMap.on('mousemove', this.overviewMapMouseMove.bind(this))
        this.overviewMap.on('mousedown', this.overviewMapMouseDown.bind(this))
        this.overviewMap.on('mouseup', this.overviewMapMouseUp.bind(this))
    }

    private overviewMapMouseDown(e): void {
        this.isDragging = true
        this.previousPoint = this.currentPoint
        this.currentPoint = [e.lngLat.lng, e.lngLat.lat]
    }

    private overviewMapMouseMove(e): void {
        if (this.isDragging) {
            this.previousPoint = this.currentPoint
            this.currentPoint = [e.lngLat.lng, e.lngLat.lat]

            const offset = [this.previousPoint[0] - this.currentPoint[0], this.previousPoint[1] - this.currentPoint[1]]
            const newBounds = this.moveTrackingRect(offset)
            this.parentMap.fitBounds(newBounds, { animate: false, duration: 80 })
        }
    }

    private overviewMapMouseUp(): void {
        this.isDragging = false
        this.overviewMap.setCenter(this.parentMap.getCenter())
    }

    private parentMapEventListener(event: Event): void {
        const { type } = event
        if (this.isCollapsed)
            return
        if (this.isDragging)
            return
        switch (type) {
            case 'zoom':
                this.overviewMap.setZoom(this.parentMap.getZoom() - difference)
                break
            case 'move':
                this.overviewMap.setCenter(this.parentMap.getCenter())
                break
            default:
                break
        }
        this.setTrackingRectBounds()
    }

    /**
     * 初始化总览地图的追踪矩形。
     *
     * @private
     * @return {void}
     */
    private trackingRectInitialize(): void {
        const coordinates = this.convertBoundsToPoints(this.parentMap.getBounds())
        this.overviewMap.addSource('trackingRect', { data: {
            geometry: { coordinates, type: 'Polygon' },
            properties: { name: 'trackingRect' },
            type: 'Feature',
        }, type: 'geojson' })
        this.overviewMap.addLayer({
            id: 'trackingRectOutline',
            layout: {},
            paint: {
                'line-color': '#000',
                'line-dasharray': [1, 1],
                'line-opacity': 1,
                'line-width': 1,
            },
            source: 'trackingRect',
            type: 'line',
        })
    }

    /**
     * 将给定的边界对象转换为点数组。
     *
     * @param {object} bounds - 要转换的边界对象。
     * @return {Array} 表示转换后边界的点数组。
     */
    private convertBoundsToPoints(bounds: Bounds): number[][][] {
        const ne = bounds._ne
        const sw = bounds._sw
        const points = [[
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ]]
        points[0][0][0] = ne.lng
        points[0][0][1] = ne.lat
        points[0][1][0] = sw.lng
        points[0][1][1] = ne.lat
        points[0][2][0] = sw.lng
        points[0][2][1] = sw.lat
        points[0][3][0] = ne.lng
        points[0][3][1] = sw.lat
        points[0][4][0] = ne.lng
        points[0][4][1] = ne.lat
        return points
    }

    /**
     * 根据父地图的边界设置追踪矩形的边界。
     *
     * @return {void}
     */
    private setTrackingRectBounds(): void {
        const source = this.overviewMap.getSource('trackingRect') as ISource
        if (source) {
            const bounds = this.parentMap.getBounds()
            const data = source._data
            data.geometry.coordinates = this.convertBoundsToPoints(bounds)
            source.setData(data)
        }
    }

    /**
     * 返回移动跟踪矩形根据偏移量修正后的矩形边界。
     *
     * @param {number[]} offset - 要移动跟踪矩形的偏移量。
     * @return {object} - 更新后的跟踪矩形边界。
     */
    private moveTrackingRect(offset: number[]): Bounds {
        const source = this.overviewMap.getSource('trackingRect') as ISource
        const data = source._data
        const coordinates = data.geometry.coordinates
        const bounds = new LngLatBounds()
        bounds._ne = new LngLat(coordinates[0][0][0] - offset[0], coordinates[0][0][1] - offset[1])
        bounds._sw = new LngLat(coordinates[0][2][0] - offset[0], coordinates[0][2][1] - offset[1])
        data.geometry.coordinates = this.convertBoundsToPoints(bounds)
        source.setData(data)
        return bounds
    }

    /**
     * 初始化总览地图。
     *
     * @return {Promise<Map>} 一个解析为创建的 Map 对象的 Promise。
     */
    public overviewMapInitialize(): Promise<Map> {
        return new Promise((resolve) => {
            if (this.overviewMap)
                this.overviewMap.remove()

            this.overviewMap = new Map({
                center: this.parentMap.getCenter(),
                container: this.containerID,
                maxZoom: this.parentMap.getMaxZoom() + difference,
                minZoom: this.parentMap.getMinZoom() - difference,
                preserveDrawingBuffer: true,
                style: {
                    layers: [{
                        id: 'background',
                        paint: { 'background-color': 'rgb(2,26,80,0)' },
                        type: 'background',
                    }],
                    sources: {},
                    version: 8,
                },
                zoom: this.parentMap.getZoom() - difference,
            })

            this.overviewMap.on('load', () => {
                this.trackingRectInitialize()
                this.disableOverviewMapEvents()
                this.setEvents()
                resolve(this.overviewMap)
            })
        })
    }

    /**
     * 获取概览地图。
     *
     * @return {Map} 概览地图。
     */
    public getOverviewMap(): Map {
        return this.overviewMap
    }
}
