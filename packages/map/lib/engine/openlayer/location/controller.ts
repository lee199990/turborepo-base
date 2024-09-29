/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/13
 * @Last Modified by:
 * @Last Modified time: 2023/12/13 16:03
 */
import { controller } from '../../../controllers/decorator'
import { Lnglat, LocationControllerAdapter } from '../../../controllers/location-controller/location-controller'
import { Map } from 'ol'

@controller('CustomOpenLayers')
export class LocationController extends LocationControllerAdapter<Map> {
    flyTo(lnglat: Lnglat): this {
        // this.mapInstance.getView().animate({
        //     center: lnglat as [number, number],
        //     duration: 1000
        // });
        let center = lnglat
        if (this.checkType(lnglat) === 'LngLat')
            center = [(lnglat as { lat: number, lng: number }).lng, (lnglat as { lat: number, lng: number }).lat]

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.mapInstance.getView().setCenter(center)
        return this
    }

    zoomTo(level: number): this {
        // this.mapInstance.getView().animate({
        //     zoom: level,
        //     duration: 1000
        // });
        this.mapInstance.getView().setZoom(level)
        return this
    }

    rotateTo(angle: number): this {
        // 弧度制
        const rotation = angle / 180
        this.mapInstance.getView().setRotation(Math.PI * rotation)
        return this
    }
}
