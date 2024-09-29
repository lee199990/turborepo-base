/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/8
 * @Last Modified by:
 * @Last Modified time: 2023/12/8 16:09
 */

import type { LayerOptions } from '../layers-operations'

export interface TmsLayerOption extends LayerOptions {
    public?: boolean
    // 是否OGC TMS
    tms?: boolean
}
