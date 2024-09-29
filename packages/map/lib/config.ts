/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/19
 * @Last Modified by:
 * @Last Modified time: 2023/12/19 14:56
 */

import type { LngLat } from './type'

export class InitConfig {
    // 初始化坐标位置
    position: LngLat = [109.188531, 19.765787]

    // 地图缩放
    zoom: { min: number, max: number, active: number } = {
        active: 16,
        max: 22,
        min: 5,
    }
}
