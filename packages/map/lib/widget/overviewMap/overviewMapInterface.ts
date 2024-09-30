/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/23
 * @Last Modified by:
 * @Last Modified time: 2023/12/23 9:43
 */

export interface OverviewMapOptions {
    className?: string
    collapsed?: boolean
    collapsible?: boolean
    height?: number
    width?: number
}
export abstract class OverviewMapInterface<M, O> {
    constructor(protected parentMap: M, protected options: OverviewMapOptions = {
        collapsed: true,
        collapsible: true,
        height: 200,
        width: 300,
    }) {
        this.addOverviewMap(options)
    }

    protected overviewMap!: O

    abstract addOverviewMap(options: OverviewMapOptions): this

    abstract addTmsLayer(options): void
}
