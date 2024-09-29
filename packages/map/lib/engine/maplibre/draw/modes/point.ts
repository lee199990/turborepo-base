/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/25
 * @Last Modified by:
 * @Last Modified time: 2023/12/25 11:48
 */
import type { ModeState } from './utils'
import {
    FeatureId,
    ModeOption,
    createGuideFeature,
    emptyPoint,
    getLayers,
    handleStop,
    snap,
    useGuide,
} from './utils'
import type { DrawCustomMode, DrawPoint } from '@mapbox/mapbox-gl-draw'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import type { GeoJSON } from 'geojson'

interface PointState extends ModeState {
    point: DrawPoint
}

export const PointMode: DrawCustomMode<PointState> = {
    onClick(state, e: MapboxDraw.MapMouseEvent) {
        if (e.originalEvent.button === 2) {
            if (state.point && state.modify)
                this.changeMode('simple_select', { featureIds: [state.point.id] })

            else
                this.changeMode('static')

            return
        }
        const point = this.newFeature(emptyPoint(state.near ? [state.near.lng, state.near.lat] : [e.lngLat.lng, e.lngLat.lat])) as DrawPoint
        state.point = point
        this.addFeature(point)
        if (state.once)
            this.changeMode('static')
    },
    onKeyUp(state, e) {
        if (e.key === 'Escape') {
            this.changeMode('static')
            this.deleteFeature(FeatureId.VerticalGuide)
            this.deleteFeature(FeatureId.HorizontalGuide)
        }
    },
    onMouseMove(state, e) {
        this.updateUIClasses({ mouse: MapboxDraw.constants.cursors.ADD })
        let lngLat = { lat: e.lngLat.lat, lng: e.lngLat.lng }
        if (state.snap && !e.originalEvent.altKey) {
            lngLat = snap(
                this.map,
                state,
                lngLat,
            )
            state.near = lngLat
        }
        if (state.guide) {
            useGuide(
                state,
                lngLat,
                this.map,
            )
        }
    },
    onSetup(options: Partial<ModeOption>): PointState {
        this.updateUIClasses({ mouse: MapboxDraw.constants.cursors.ADD })
        this.activateUIButton(MapboxDraw.constants.types.POINT)
        const state = ModeOption.create<PointState>({ ...options, snapLayers: getLayers(this.map) })
        if (options.snapLayers !== undefined)
            state.snapLayers.push(...options.snapLayers)

        if (state.guide) {
            state.verticalGuide = this.newFeature(createGuideFeature(FeatureId.VerticalGuide))
            state.horizontalGuide = this.newFeature(createGuideFeature(FeatureId.HorizontalGuide))
            this.addFeature(state.verticalGuide)
            this.addFeature(state.horizontalGuide)
        }

        return state
    },
    onStop(state) {
        handleStop(this, state.point)
    },
    onTap(state, e) {
        if (this.onClick)
            this.onClick(state, e as unknown as MapboxDraw.MapMouseEvent)
    },
    toDisplayFeatures(
        state: ModeState,
        geojson: GeoJSON,
        display: (geojson: GeoJSON) => void,
    ) {
        display(geojson)
    },
}
