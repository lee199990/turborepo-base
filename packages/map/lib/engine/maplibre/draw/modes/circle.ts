/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/26
 * @Last Modified by:
 * @Last Modified time: 2023/12/26 14:53
 */

import type { ModeState } from './utils'
import {
    ModeOption,
    clickToComplete,
    emptyLine,
    emptyPolygon,
    getLayers,
    handleKeyup,
    handleMove,
    handleSetup,
    handleStop,
    rightButtonCancel,
} from './utils'
import type {
    DrawCustomMode,
    DrawLineString,
    DrawPolygon,
} from '@mapbox/mapbox-gl-draw'
import { circle, length } from '@turf/turf'
import type { Feature } from 'geojson'

interface CircleState extends ModeState {
    circle: DrawPolygon
    radiusLine?: DrawLineString
}

export const CircleMode: DrawCustomMode<CircleState> = {
    onClick(state, e) {
        this.map.doubleClickZoom.disable()
        if (rightButtonCancel(
            this,
            e,
            state.circle,
        )) {
            this.deleteFeature(state.radiusLine!.id.toString())
            return
        }
        const lngLat = state.near ?? e.lngLat
        if (state.radiusLine === undefined) {
            state.radiusLine = this.newFeature(emptyLine([[lngLat.lng, lngLat.lat]])) as DrawLineString
            this.addFeature(state.radiusLine)
            return
        }
        clickToComplete(
            this,
            state,
            'circle',
            () =>
                this.newFeature(emptyPolygon({ circle: 'true' })),
        )
        this.deleteFeature(state.radiusLine.id.toString())
        state.radiusLine = undefined
    },
    onKeyUp(state, e) {
        handleKeyup(
            this,
            state.circle,
            e,
        )
    },
    onMouseMove(state, e) {
        const lngLat = handleMove(
            this,
            state,
            e,
        )
        if (state.radiusLine === undefined)
            return

        state.radiusLine.updateCoordinate(
            '1',
            lngLat.lng,
            lngLat.lat,
        )
        const center = state.radiusLine.coordinates[0]
        const distance = length(state.radiusLine.toGeoJSON() as Feature, { units: 'meters' })
        const circleGeo = circle(
            center,
            distance,
            { steps: 64, units: 'meters' },
        )
        state.circle.setCoordinates(circleGeo.geometry.coordinates)
    },
    onSetup(options: ModeOption): CircleState {
        const circle = this.newFeature(emptyPolygon({ circle: 'true' }))
        // 当前激活的顶点在坐标数组中的位置
        const state = ModeOption.create<CircleState>({
            ...options,
            circle: circle as DrawPolygon,
            currentVertexIndexInCoords: 0,
            snapLayers: getLayers(this.map),
        })
        if (options.snapLayers !== undefined)
            state.snapLayers.push(...options.snapLayers)

        handleSetup(
            this,
            state,
            circle,
        )
        return state
    },
    onStop(state) {
        state.circle.removeCoordinate(`0.${state.currentVertexIndexInCoords}`)
        handleStop(this, state.circle)
    },
    toDisplayFeatures(
        state,
        geojson,
        display,
    ) {
        display(geojson)
    },
}
