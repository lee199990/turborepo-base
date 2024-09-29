/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/13
 * @Last Modified by:
 * @Last Modified time: 2023/12/13 15:48
 */
import { controller } from '../../../controllers/decorator'
import { Lnglat, LocationControllerAdapter } from '../../../controllers/location-controller/location-controller'
import { Map } from 'maplibre-gl'

@controller('CustomMapLibre')
export class LocationController extends LocationControllerAdapter<Map> {
    flyTo(lnglat: Lnglat): this {
        // this.mapInstance.flyTo({ center: lnglat, essential: false });
        // maplibre 的 flyTo 与类似于 zoomTo 方法一起调用会产生冲突
        console.log(this.checkType(lnglat))
        this.mapInstance.setCenter(lnglat)
        return this
    }

    zoomTo(level: number): this {
        this.mapInstance.setZoom(level)
        return this
    }

    rotateTo(angle: number): this {
        this.mapInstance.setBearing(-angle)
        return this
    }
}
