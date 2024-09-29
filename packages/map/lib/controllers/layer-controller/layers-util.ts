/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/15
 * @Last Modified by:
 * @Last Modified time: 2023/12/15 16:30
 */

import type { GroupOption, ViewItem } from './type'
import { LayerFormat } from './type'

export function mergeLayerMeta<T>(
    capabilitiesLayers: T[],
    key: string,
    toMerge: ViewItem[],
): (ViewItem & { meta: T })[] {
    const result: (ViewItem & { meta: T })[] = []

    if (toMerge.length === 0)
        return capabilitiesLayers.map(meta => ({ meta, name: meta[key] }))

    toMerge.forEach((styleItem) => {
        const meta = capabilitiesLayers.find(l => l[key] === styleItem.name)
        if (meta !== undefined)
            result.push({ ...styleItem, meta })
    })

    return result
}

export function getLayerStyle(groupOption: GroupOption): ViewItem[] {
    const { format } = groupOption
    switch (format) {
        case LayerFormat.Mvt:
        case LayerFormat.Geojson:
            return groupOption.view
        case LayerFormat.Png:
        case LayerFormat.Jpg:
        default:
            return groupOption.layers.map(name => ({ name }))
    }
}

export function createLayerOption(groupOption: GroupOption) {
    return {
        groupId: groupOption.groupId,
        subdomains: groupOption.subdomains,
        url: groupOption.url,
    }
}
