/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/23
 * @Last Modified by:
 * @Last Modified time: 2023/12/23 10:16
 */
import type { MapInstanceType } from '../../../util/checkTypeOfMapInstance'
import { getTypeOfMapInstance, isCustomMapLibre } from '../../../util/checkTypeOfMapInstance'
import type { TmsLayerOption } from '../../controllers'
import { MaplibreOverviewMap } from '../../engine/maplibre/map-widget/overview-map/MaplibreOverviewMap'
import { OpenlayersOverviewMap } from '../../engine/openlayer/map-widget/overview-map/OpenlayersOverviewMap'
import type { OverviewMapOptions } from './overviewMapInterface'

export class OverviewMap {
    private overviewMap!: MaplibreOverviewMap | OpenlayersOverviewMap

    constructor(protected parentMap: MapInstanceType, protected options?: OverviewMapOptions) {
        if (getTypeOfMapInstance(parentMap) === 'unknown')
            throw new Error('未知的地图类型, 请检查构造器传入参数是否正确')
        else
            this.overviewMapInit(parentMap.instance)
    }

    private overviewMapInit(instance): void {
        this.overviewMap = isCustomMapLibre(this.parentMap)
            ? new MaplibreOverviewMap(instance, this.options)
            : new OpenlayersOverviewMap(instance, this.options)
    }

    public addLayer(options: TmsLayerOption): this {
        options.id = `${options.id}_overview`
        this.overviewMap.addTmsLayer(options)
        return this
    }
}

export function overviewMap(map: MapInstanceType) {
    console.log(123)
    return new OverviewMap(map)
}
