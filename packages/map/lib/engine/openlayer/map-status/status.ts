/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/14
 * @Last Modified by:
 * @Last Modified time: 2023/12/14 11:02
 */
import type { LngLat, MapStatusType } from '../../../controllers/map-status/map-status'
import { MapStatusAdapter } from '../../../controllers/map-status/map-status'
import type { Map } from 'ol'

export class MapStatus extends MapStatusAdapter<Map> {
    getZoom(digits?: number): number {
        let zoom = this.mapInstance.getView().getZoom() || 0
        zoom = digits ? Number(zoom.toFixed(digits)) : zoom
        return zoom
    }

    getRotate(digits?: number): number {
        let rotate = this.mapInstance.getView().getRotation()
        rotate = (rotate / Math.PI) * 180
        rotate = digits ? Number(rotate.toFixed(digits)) : rotate
        return rotate === 0 ? 0 : rotate
    }

    getBounds(): { northEast: LngLat, southWest: LngLat } {
        const bounds = this.mapInstance.getView().calculateExtentInternal()
        return { northEast: { lat: bounds[3], lng: bounds[2] }, southWest: { lat: bounds[1], lng: bounds[0] } }
    }

    getCenter(): LngLat {
        const center = this.mapInstance.getView().getCenter()
        return center ? { lat: center[1], lng: center[0] } : { lat: 0, lng: 0 }
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
