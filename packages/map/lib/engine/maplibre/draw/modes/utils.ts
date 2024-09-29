/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/25
 * @Last Modified by:
 * @Last Modified time: 2023/12/25 11:55
 */
import type {
    DrawCustomModeThis,
    DrawFeature,
    MapMouseEvent,
} from '@mapbox/mapbox-gl-draw'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import {
    bbox,
    circle,
    distance,
    nearestPointOnLine,
    pointToLineDistance,
    polygonToLine,
} from '@turf/turf'
import type {
    Feature,
    LineString,
    MultiLineString,
    Position,
} from 'geojson'
import { isEqual } from 'lodash-es'

export class ModeOption {
    static create<T extends ModeOption>(opt?: Partial<T>) {
        return { ...new ModeOption(), ...opt } as T
    }

    guide = true

    snap = true

    // 捕捉距离， 单位像素
    snapTolerance = 15

    snapLayers: string[] = []

    modify = true

    once: boolean = true

    featureId?: string
}

export interface LngLat { lat: number, lng: number }

export interface ModeState extends ModeOption {
    // 当前激活的顶点在坐标数组中的位置
    currentVertexIndexInCoords: number
    horizontalGuide?: DrawFeature
    lastVertex?: LngLat
    near?: LngLat
    verticalGuide?: DrawFeature
}

export enum FeatureId {
    HorizontalGuide = 'horizontalGuide',
    VerticalGuide = 'verticalGuide',
}

/**
 * 创建一个空的多边形要素以供MapboxDraw使用。
 *
 * @param {object} properties - 多边形要素的可选属性。
 * @param {Position[][]} coordinates - 多边形要素的可选坐标。
 * @return {object} 空的多边形要素。
 */
export function emptyPolygon(properties?: object, coordinates: Position[][] = []) {
    return {
        geometry: { coordinates, type: MapboxDraw.constants.geojsonTypes.POLYGON },
        properties: { notSnap: 'true', ...properties },
        type: MapboxDraw.constants.geojsonTypes.FEATURE,
    }
}
/**
 * 创建一个空的线要素以供MapboxDraw使用。
 *
 * @param {Position[][]} coordinates - 多边形要素的可选坐标。
 * @return {object} 空的多边形要素。
 */
export function emptyLine(coordinates: Position[] = []) {
    return {
        geometry: { coordinates, type: MapboxDraw.constants.geojsonTypes.LINE_STRING },
        properties: { notSnap: 'true' },
        type: MapboxDraw.constants.geojsonTypes.FEATURE,
    }
}
/**
 * 创建一个空的点要素以供MapboxDraw使用。
 *
 * @param {Position[][]} coordinates - 多边形要素的可选坐标。
 * @return {object} 空的多边形要素。
 */
export function emptyPoint(coordinates: Position = []) {
    return {
        geometry: { coordinates, type: MapboxDraw.constants.geojsonTypes.POINT },
        properties: {},
        type: MapboxDraw.constants.geojsonTypes.FEATURE,
    }
}

/**
 * 从给定的地图中获取包含'draw-'的图层。用于默认的吸附图层
 *
 * @param {DrawCustomModeThis['map']} map - 要获取图层的地图。
 * @return {string[]} 图层id的数组。
 */
export function getLayers(map: DrawCustomModeThis['map']) {
    return map
        .getStyle()
        .layers.filter(l => l.id.includes('draw-'))
        .map(l => l.id)
}

/**
 * 根据纬度和地图层级获取当前像素代表的实际距离
 * @param latitude
 * @param zoomLevel
 */
function metersPerPixel(latitude, zoomLevel) {
    const earthCircumference = 40075017
    const latitudeRadians = latitude * (Math.PI / 180)
    return (earthCircumference * Math.cos(latitudeRadians)) / 2 ** (zoomLevel + 8)
}

/**
 * 创建一个捕捉线的要素
 * @param id
 */
export function createGuideFeature(id: FeatureId): Feature<LineString> {
    return {
        geometry: { coordinates: [], type: 'LineString' },
        id,
        properties: { guide: 'true', notSnap: 'true' },
        type: 'Feature',
    }
}

export function multiLineStringToLineString(geometry: LineString | MultiLineString): LineString {
    return geometry.type === 'LineString'
        ? geometry
        : { coordinates: geometry.coordinates.flat(), type: 'LineString' }
}

/**
 * 计算捕捉点
 * @param { DrawCustomModeThis['map'] } map draw中的map对象
 * @param { ModeState } state   可变数据源
 * @param { { lng: number; lat: number } } lngLat  鼠标目前的经纬度
 */
export function snap(
    map: DrawCustomModeThis['map'],
    state: ModeState,
    lngLat: LngLat,
): LngLat {
    const lngLatPointLike = [lngLat.lng, lngLat.lat]
    // 将选项中的捕捉距离（像素）转换为实际距离的米
    const meters = metersPerPixel(lngLat.lat, map.getZoom()) * state.snapTolerance
    // 生成一个圆来获取bbox矩形范围
    const circleFeature = circle(
        lngLatPointLike,
        meters,
        { steps: 10, units: 'meters' },
    )
    const [
        minLng,
        minLat,
        maxLng,
        maxLat,
    ] = bbox(circleFeature)
    // 查询图形中渲染的要素，过滤掉辅助线
    const features = map
        .queryRenderedFeatures([map.project([minLng, minLat]), map.project([maxLng, maxLat])], { layers: state.snapLayers })
        // 过滤掉不需要吸附的要素，一般为自身
        .filter(({ properties }) => properties?.user_notSnap !== 'true')

    if (features.length === 0)
        return lngLat

    // 计算最近点
    let closestPoint: Position | undefined
    let closestDistance = Number.POSITIVE_INFINITY
    /**
     * 比较给定点与当前最近点之间的距离。
     * @param {Position} point - 与当前最近点进行比较的位置。
     */
    const comparingDistance = (point: Position) => {
        const toDistance = distance(
            lngLatPointLike,
            point,
            { units: 'meters' },
        )
        if (toDistance < closestDistance) {
            closestDistance = toDistance
            closestPoint = point
        }
    }
    // 分别处理不同的类型
    features.forEach((feature) => {
        const geometry = feature.geometry

        switch (geometry.type) {
            case 'LineString':
            case 'MultiLineString':
                comparingDistance(nearestPointOnLine(geometry, lngLatPointLike).geometry.coordinates)
                break
            case 'Polygon':
            case 'MultiPolygon': {
                const line = polygonToLine(geometry)
                // 如果queryRenderedFeatures的范围被多边形的范围包裹则必定会被查询到，但我们只需要吸附边线，所以需要再次判断一下距离是否满足
                const nearest = (subFeature: Feature<LineString | MultiLineString>) => {
                    // 计算MultiLineString没有意义，统一转换成LineString计算最近的距离即可
                    const toLine = multiLineStringToLineString(subFeature.geometry)
                    const distance = pointToLineDistance(
                        lngLatPointLike,
                        toLine,
                        { units: 'meters' },
                    )
                    // 如果去掉当前部分，当绘制范围在多边形内部的时候将无法正确吸附
                    if (distance > meters)
                        return

                    // 多边形转换成线
                    const snapped = nearestPointOnLine(subFeature, lngLatPointLike)
                    comparingDistance(snapped.geometry.coordinates)
                }
                if (line.type === 'FeatureCollection') {
                    line.features.forEach(nearest)
                    return
                }
                nearest(line)
                break
            }
            case 'MultiPoint':
                geometry.coordinates.forEach(comparingDistance)
                break
            case 'Point':
                comparingDistance(geometry.coordinates)
                break
            default:
                console.error(`暂未实现${geometry.type}的处理方式`)
        }
    })

    if (closestPoint !== undefined)
        return { lat: closestPoint[1], lng: closestPoint[0] }

    return lngLat
}

/**
 * 创建辅助线要素
 * @param self
 * @param state
 */
export function createGuide(self: DrawCustomModeThis, state: ModeState) {
    state.verticalGuide = self.newFeature(createGuideFeature(FeatureId.VerticalGuide))
    state.horizontalGuide = self.newFeature(createGuideFeature(FeatureId.HorizontalGuide))
    self.addFeature(state.verticalGuide)
    self.addFeature(state.horizontalGuide)
}

/**
 * 公共的初始化辅助函数，绘图初始化设置一般包含公共的业务逻辑
 * @param self
 * @param state
 * @param feature
 */
export function handleSetup(
    self: DrawCustomModeThis,
    state: ModeState,
    feature?: DrawFeature,
) {
    if (feature)
        self.addFeature(feature)
    self.clearSelectedFeatures()
    self.updateUIClasses({ mouse: MapboxDraw.constants.cursors.ADD })
    self.activateUIButton(MapboxDraw.constants.types.POLYGON)

    if (state.guide)
        createGuide(self, state)

    self.setActionableState({
        combineFeatures: true,
        trash: true,
        uncombineFeatures: false,
    })
}

/**
 * 计算视口边界的经纬度，与指定点组合生成辅助线
 * @param state
 * @param nearLngLat
 * @param map
 */
export function useGuide(
    state: ModeState,
    nearLngLat: { lng: number, lat: number },
    map: DrawCustomModeThis['map'],
) {
    const width = map.getCanvas().width
    const height = map.getCanvas().height
    const top = map.unproject([width / 2, 0])
    const bottom = map.unproject([width / 2, height])
    const left = map.unproject([0, height / 2])
    const right = map.unproject([width, height / 2])
    if (state.verticalGuide) {
        state.verticalGuide.updateCoordinate(
            '0',
            nearLngLat.lng,
            top.lat,
        )
        state.verticalGuide.updateCoordinate(
            '1',
            nearLngLat.lng,
            bottom.lat,
        )
    }
    if (state.horizontalGuide) {
        state.horizontalGuide.updateCoordinate(
            '0',
            left.lng,
            nearLngLat.lat,
        )
        state.horizontalGuide.updateCoordinate(
            '1',
            right.lng,
            nearLngLat.lat,
        )
    }
}

/**
 * 判断点击的是否为顶点
 * @param e
 */
export function isVertex(e) {
    const featureTarget = e.featureTarget
    if (!featureTarget)
        return false
    if (!featureTarget.properties)
        return false
    return featureTarget.properties.meta === MapboxDraw.constants.meta.VERTEX
}

/**
 * 处理鼠标移动的公共部分逻辑
 * @param self
 * @param state
 * @param event
 */
export function handleMove(
    self: DrawCustomModeThis,
    state: ModeState,
    event: MapMouseEvent,
) {
    let lngLat = { lat: event.lngLat.lat, lng: event.lngLat.lng }
    if (state.snap && !event.originalEvent.altKey) {
        lngLat = snap(
            self.map,
            state,
            lngLat,
        )
        state.near = lngLat
    }
    if (isVertex(event))
        self.updateUIClasses({ mouse: MapboxDraw.constants.cursors.POINTER })
    else
        self.updateUIClasses({ mouse: MapboxDraw.constants.cursors.ADD })

    if (state.guide) {
        useGuide(
            state,
            lngLat,
            self.map,
        )
    }

    return lngLat
}

/**
 * 处理按键的公共部分逻辑
 * @param self
 * @param feature
 * @param e
 */
export function handleKeyup(
    self: DrawCustomModeThis,
    feature: DrawFeature,
    e: KeyboardEvent,
) {
    if (e.key === 'Enter') {
        self.changeMode(MapboxDraw.constants.modes.SIMPLE_SELECT, { featureIds: [feature.id] })
    }
    else if (e.key === 'Escape') {
        self.deleteFeature(feature.id.toString(), { silent: true })
        self.changeMode('static')
    }
}

/**
 * 判断是否鼠标右键，并取消
 * @param self
 * @param event
 * @param feature
 */
export function rightButtonCancel(
    self: DrawCustomModeThis,
    event: MapMouseEvent,
    feature: DrawFeature,
) {
    if (event.originalEvent.button === 2) {
        self.deleteFeature(feature.id.toString(), { silent: true })
        self.changeMode('static')
        return true
    }
    return false
}

/**
 * 判断是否是双击在同一个位置
 * @param lntLat
 * @param state
 */
export function checkRepeatedClick(lntLat: LngLat, state: ModeState) {
    return state.lastVertex && isEqual(state.lastVertex, lntLat)
}

/**
 * 处理点击事件中完成的公共部分逻辑
 * @param self
 * @param state
 * @param featureName
 * @param recreate
 */
export function clickToComplete(
    self: DrawCustomModeThis,
    state: ModeState,
    featureName: string,
    recreate: () => DrawFeature,
) {
    if (!state.once) {
        // 如果不是一次性的，重置状态
        const feature = state[featureName]
        feature.setProperty('notSnap', 'false')
        self.map.fire(MapboxDraw.constants.events.CREATE, { features: [feature.toGeoJSON()] })
        state[featureName] = recreate()
        self.addFeature(state[featureName])
        state.currentVertexIndexInCoords = 0
        state.lastVertex = undefined
        return
    }
    if (state.modify) {
        self.changeMode(MapboxDraw.constants.modes.SIMPLE_SELECT, { featureIds: [state[featureName].id] })
        return
    }
    self.changeMode('static')
}

/**
 * 处理停止的公共部分逻辑
 * @param self
 * @param feature
 */
export function handleStop(self: DrawCustomModeThis, feature?: DrawFeature) {
    self.updateUIClasses({ mouse: MapboxDraw.constants.cursors.NONE })
    self.activateUIButton()
    self.deleteFeature(FeatureId.VerticalGuide)
    self.deleteFeature(FeatureId.HorizontalGuide)
    if (feature === undefined)
        return

    feature.setProperty('notSnap', 'false')
    // check to see if we've deleted this feature
    if (self.getFeature(feature.id.toString()) === undefined)
        return
    if (feature.isValid()) {
        self.map.fire(MapboxDraw.constants.events.CREATE, { features: [feature.toGeoJSON()] })
    }
    else {
        self.deleteFeature(feature.id.toString(), { silent: true })
        self.changeMode(
            MapboxDraw.constants.modes.SIMPLE_SELECT,
            {},
            { silent: true },
        )
    }
}
