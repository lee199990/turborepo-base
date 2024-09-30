/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/28
 * @Last Modified by:
 * @Last Modified time: 2023/12/28 14:53
 */

type Positioning =
    | 'bottom-left'
    | 'bottom'
    | 'bottom-right'
    | 'left'
    | 'center'
    | 'right'
    | 'top-left'
    | 'top'
    | 'top-right'
export interface PopupOptions {
    className?: string | undefined
    maxHeight?: number | undefined
    maxWidth?: number | undefined
    minWidth?: number | undefined
    offset?: [number, number] | undefined
    positioning?: Positioning | undefined
    removeCloseButton?: boolean | undefined
}

export abstract class PopupInterface<M, P, C> {
    protected overlay!: P

    protected position!: C

    protected content!: string | HTMLElement

    protected contentDiv!: HTMLElement

    constructor(protected map: M, protected options?: PopupOptions) {
        this.init()
    }

    abstract init(): void

    abstract setPosition(position: C): void

    abstract setContent(content: string | HTMLElement): this

    abstract addToMap(map): this

    abstract getElement(): HTMLElement | undefined
}
