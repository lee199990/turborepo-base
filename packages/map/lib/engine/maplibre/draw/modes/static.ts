import type { DrawCustomMode } from '@mapbox/mapbox-gl-draw'

export const StaticMode: DrawCustomMode = { onSetup() {
    this.setActionableState({
        combineFeatures: false,
        trash: false,
        uncombineFeatures: false,
    })
    return {}
}, toDisplayFeatures(
    state,
    geojson,
    display,
): void {
    display(geojson)
} }
