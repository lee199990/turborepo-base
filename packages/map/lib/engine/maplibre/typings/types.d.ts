/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 9:22
 */

declare module 'maplibre-gl' {
    import type { AddLayerObject } from 'maplibre-gl'

    export interface Map {
        addLayer(layer: AddLayerObject & { /* 图层层级 */ zIndex?: number }, before?: string): this
    }
}
export = {}
