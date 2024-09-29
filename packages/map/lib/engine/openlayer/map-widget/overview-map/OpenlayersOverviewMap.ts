/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/20
 * @Last Modified by:
 * @Last Modified time: 2023/12/20 15:29
 */

import '../../../../widget/overviewMap/overviewMap.scss'
import type { OverviewMapOptions } from '../../../../widget/overviewMap/overviewMapInterface'
import { OverviewMapInterface } from '../../../../widget/overviewMap/overviewMapInterface'
import { TmsLayer } from '../../layers/tms'
import type { Map } from 'ol'
import { OverviewMap } from 'ol/control'

export class OpenlayersOverviewMap extends OverviewMapInterface<Map, OverviewMap> {
    addOverviewMap(options: OverviewMapOptions): this {
        this.overviewMap = new OverviewMap({
            className: `ol-overviewmap ${options.className}`,
            collapsed: options.collapsed,
            collapsible: options.collapsible,
        })

        // 创建 MutationObserver 实例
        const observer = new MutationObserver((mutations, observer) => {
            // 要观察的目标节点
            const targetNode = document.querySelector('.ol-overviewmap-map') as HTMLElement
            if (targetNode) {
                observer.disconnect()
                targetNode.style.cssText = `width: ${options.width}px; height: ${options.height}px;`
            }
        })
        // 开始观察目标节点
        observer.observe(document, { childList: true, subtree: true })

        return this
    }

    addTmsLayer(options) {
        const layer = new TmsLayer(this.overviewMap.getOverviewMap(), options)
            .create()
            .getOriginalLayer()
        this.overviewMap.getOverviewMap().addLayer(layer)
        this.parentMap.addControl(this.overviewMap)
    }
}
