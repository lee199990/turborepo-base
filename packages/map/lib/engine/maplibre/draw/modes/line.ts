/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/25
 * @Last Modified by:
 * @Last Modified time: 2023/12/25 18:39
 */

import type { ModeState } from './utils'
import {
    ModeOption,
    checkRepeatedClick,
    clickToComplete,
    emptyLine,
    getLayers,
    handleKeyup,
    handleMove,
    handleSetup,
    handleStop,
    isVertex,
    rightButtonCancel,
} from './utils'
import type { DrawCustomMode, DrawLineString } from '@mapbox/mapbox-gl-draw'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

interface LineState extends ModeState {
    line: DrawLineString
}

export const LineMode: DrawCustomMode<LineState> = {
    onClick(state, e) {
        this.map.doubleClickZoom.disable()
        if (rightButtonCancel(
            this,
            e,
            state.line,
        ))
            return

        const lngLat = state.near ?? e.lngLat
        // 双击完成
        if (checkRepeatedClick(lngLat, state)) {
            clickToComplete(
                this,
                state,
                'line',
                () => this.newFeature(emptyLine()),
            )
            return
        }
        // 当前顶点的位置由鼠标移动时设置，此时设置下一个顶点，当前则会被保留，而鼠标移动时则会设置下一个
        // 所以当前顶点就是最后的操作的顶点
        state.lastVertex = lngLat
        state.currentVertexIndexInCoords += 1
        state.line.updateCoordinate(
            state.currentVertexIndexInCoords.toString(),
            lngLat.lng,
            lngLat.lat,
        )
        setTimeout(() => {
            this.map.doubleClickZoom.enable()
        }, 0)
    },
    onKeyUp(state, e) {
        handleKeyup(
            this,
            state.line,
            e,
        )
    },
    onMouseMove(state, e) {
        const lngLat = handleMove(
            this,
            state,
            e,
        )
        state.line.updateCoordinate(
            state.currentVertexIndexInCoords.toString(),
            lngLat.lng,
            lngLat.lat,
        )
    },
    onSetup(options: ModeOption): LineState {
        const line = this.newFeature(emptyLine()) as DrawLineString
        const state = ModeOption.create<LineState>({
            ...options,
            currentVertexIndexInCoords: 0,
            line,
            snapLayers: getLayers(this.map),
        })
        if (options.snapLayers !== undefined)
            state.snapLayers.push(...options.snapLayers)

        handleSetup(
            this,
            state,
            line,
        )
        return state
    },
    onStop(state) {
        state.line.removeCoordinate(state.currentVertexIndexInCoords.toString())
        handleStop(this, state.line)
    },
    onTap(state, e) {
        if (isVertex(e))
            return this.changeMode(MapboxDraw.constants.modes.SIMPLE_SELECT, { featureIds: [state.line.id] })
        return this.onClick && this.onClick(state, e as unknown as MapboxDraw.MapMouseEvent)
    },
    toDisplayFeatures(
        state,
        geojson,
        display,
    ) {
        display(geojson)
    },
}
