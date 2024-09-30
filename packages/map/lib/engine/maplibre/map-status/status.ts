/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/14
 * @Last Modified by:
 * @Last Modified time: 2023/12/14 11:02
 */
import type { LngLat, MapStatusType } from '../../../controllers/map-status/map-status'
import { MapStatusAdapter } from '../../../controllers/map-status/map-status'
import type { Map } from 'maplibre-gl'

export class MapStatus extends MapStatusAdapter<Map> {
    getZoom(digits?: number): number {
        let zoom = this.mapInstance.getZoom()
        zoom = digits ? Number(zoom.toFixed(digits)) : zoom
        return zoom
    }

    getRotate(digits?: number): number {
        let rotate = this.mapInstance.getBearing()
        rotate = digits ? Number(rotate.toFixed(digits)) : rotate
        return rotate === 0 ? 0 : -rotate
    }

    getBounds(): { northEast: LngLat, southWest: LngLat } {
        const bounds = this.mapInstance.getBounds()
        return { northEast: bounds.getNorthEast(), southWest: bounds.getSouthWest() }
    }

    getCenter(): LngLat {
        return this.mapInstance.getCenter()
    }

    getStatus(): MapStatusType {
        return {
            bounds: this.getBounds(),
            center: this.getCenter(),
            rotate: this.getRotate(),
            zoomLevel: this.getZoom(),
        }
    }
}
