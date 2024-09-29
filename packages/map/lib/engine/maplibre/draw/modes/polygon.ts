/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/26
 * @Last Modified by:
 * @Last Modified time: 2023/12/26 9:50
 */

import type { ModeState } from './utils'
import {
    ModeOption,
    checkRepeatedClick,
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
import MapboxDraw from '@mapbox/mapbox-gl-draw'

interface PolygonState extends ModeState {
    polygon: DrawPolygon
}

export const PolygonMode: DrawCustomMode<PolygonState> = {
    onClick(state, e) {
        this.map.doubleClickZoom.disable()
        if (rightButtonCancel(
            this,
            e,
            state.polygon,
        ))
            return

        const lngLat = state.near ?? e.lngLat
        // 双击完成
        if (checkRepeatedClick(lngLat, state)) {
            clickToComplete(
                this,
                state,
                'polygon',
                () => this.newFeature(emptyPolygon()),
            )
            return
        }
        state.lastVertex = lngLat
        state.currentVertexIndexInCoords += 1
        state.polygon.updateCoordinate(
            `0.${state.currentVertexIndexInCoords}`,
            lngLat.lng,
            lngLat.lat,
        )
    },
    onKeyUp(state, e) {
        handleKeyup(
            this,
            state.polygon,
            e,
        )
    },
    onMouseMove(state, e) {
        const lngLat = handleMove(
            this,
            state,
            e,
        )
        state.polygon.updateCoordinate(
            `0.${state.currentVertexIndexInCoords}`,
            lngLat.lng,
            lngLat.lat,
        )
    },
    onSetup(options: ModeOption): PolygonState {
        const polygon = this.newFeature(emptyPolygon())
        // 当前激活的顶点在坐标数组中的位置
        const state = ModeOption.create<PolygonState>({
            ...options,
            currentVertexIndexInCoords: 0,
            polygon: polygon as DrawPolygon,
            snapLayers: getLayers(this.map),
        })
        if (options.snapLayers !== undefined)
            state.snapLayers.push(...options.snapLayers)

        handleSetup(
            this,
            state,
            polygon,
        )
        return state
    },
    onStop(state) {
        state.polygon.removeCoordinate(`0.${state.currentVertexIndexInCoords}`)
        handleStop(this, state.polygon)
    },
    toDisplayFeatures: MapboxDraw.modes.draw_polygon.toDisplayFeatures.bind(this),
}
