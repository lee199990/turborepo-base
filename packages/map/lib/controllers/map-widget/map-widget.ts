/*
 * 文件简短说明
 * @Author: MengHao Lv@inslog@outlook.com
 * @Date:   2023/12/20
 * @Last Modified by:
 * @Last Modified time: 2023/12/20 15:16
 */

export abstract class MapWidgetAdapter<M> {
    constructor(protected mapInstance: M) {}

    abstract addOverviewMap(): this
}
