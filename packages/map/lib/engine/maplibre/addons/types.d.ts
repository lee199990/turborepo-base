/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/8
 * @Last Modified by:
 * @Last Modified time: 2023/12/8 17:14
 */

import 'maplibre-gl'

declare module 'maplibre-gl' {
    export interface Map {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addons: Record<string, any>

        orderLayers(orderLayers: string[]): void
    }
}
