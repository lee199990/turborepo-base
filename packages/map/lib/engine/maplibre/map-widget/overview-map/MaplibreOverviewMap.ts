/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/23
 * @Last Modified by:
 * @Last Modified time: 2023/12/23 13:54
 */

import type { OverviewMapOptions } from '../../../../widget/overviewMap/overviewMapInterface'
import { OverviewMapInterface } from '../../../../widget/overviewMap/overviewMapInterface'
import { TmsLayer } from '../../layers/tms'
import { OverviewMap } from './OverviewMap'
import type { Map } from 'maplibre-gl'

export class MaplibreOverviewMap extends OverviewMapInterface<Map, OverviewMap> {
    addOverviewMap(options: OverviewMapOptions): this {
        this.overviewMap = new OverviewMap(this.parentMap, options)
        return this
    }

    addTmsLayer(options) {
        const layer = new TmsLayer(this.overviewMap.getOverviewMap(), options)
            .create()
            .getOriginalLayer()
        void this.overviewMap.overviewMapInitialize().then((map) => {
            map.addLayer(layer, 'trackingRectOutline')
        })
    }
}
