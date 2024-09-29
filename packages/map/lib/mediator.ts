/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/21
 * @Last Modified by:
 * @Last Modified time: 2023/12/21 10:31
 */
import type { Controllers } from './gismap-modules'

export class ControllersMediator<M> {
    constructor(private controllers: Controllers<M>) {}

    getControl(key: keyof Controllers<M>): (typeof this.controllers)[typeof key] {
        return this.controllers[key]
    }
}
