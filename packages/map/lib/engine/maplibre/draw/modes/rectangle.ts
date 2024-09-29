/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/26
 * @Last Modified by:
 * @Last Modified time: 2023/12/26 16:32
 */

import type { LngLat, ModeState } from './utils'
import {
    ModeOption,
    clickToComplete,
    emptyPolygon,
    getLayers,
    handleKeyup,
    handleMove,
    handleSetup,
    handleStop,
    rightButtonCancel,
} from './utils'
import type { DrawCustomMode, DrawPolygon } from '@mapbox/mapbox-gl-draw'

interface RectangleState extends ModeState {
    rectangle: DrawPolygon
    startPoint?: LngLat
}

export const RectangleMode: DrawCustomMode<RectangleState> = {
    onClick(state, e) {
        this.map.doubleClickZoom.disable()
        if (state.rectangle && rightButtonCancel(
            this,
            e,
            state.rectangle,
        ))
            return

        const lngLat = state.near ?? e.lngLat
        if (state.startPoint === undefined) {
            state.startPoint = lngLat
            return
        }
        clickToComplete(
            this,
            state,
            'rectangle',
            () => this.newFeature(emptyPolygon()),
        )
        state.startPoint = undefined
    },
    onKeyUp(state, e) {
        handleKeyup(
            this,
            state.rectangle,
            e,
        )
    },
    onMouseMove(state, e) {
        const lngLat = handleMove(
            this,
            state,
            e,
        )
        if (state.startPoint === undefined)
            return

        // 获取矩形的四个角点坐标
        const minLng = Math.min(state.startPoint.lng, lngLat.lng)
        const maxLng = Math.max(state.startPoint.lng, lngLat.lng)
        const minLat = Math.min(state.startPoint.lat, lngLat.lat)
        const maxLat = Math.max(state.startPoint.lat, lngLat.lat)
        state.rectangle.setCoordinates([[
            [minLng, minLat],
            [maxLng, minLat],
            [maxLng, maxLat],
            [minLng, maxLat],
            [minLng, minLat],
        ]])
    },
    onSetup(options: ModeOption): RectangleState {
        const rectangle = this.newFeature(emptyPolygon()) as DrawPolygon
        // 当前激活的顶点在坐标数组中的位置
        const state = ModeOption.create<RectangleState>({
            ...options,
            currentVertexIndexInCoords: 0,
            rectangle,
            snapLayers: getLayers(this.map),
        })
        if (options.snapLayers !== undefined)
            state.snapLayers.push(...options.snapLayers)

        handleSetup(
            this,
            state,
            rectangle,
        )
        return state
    },
    onStop(state) {
        handleStop(this, state.rectangle)
    },
    toDisplayFeatures(
        state,
        geojson,
        display,
    ) {
        display(geojson)
    },
}
