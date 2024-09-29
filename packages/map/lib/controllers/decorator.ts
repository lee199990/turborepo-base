/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/19
 * @Last Modified by:
 * @Last Modified time: 2023/12/19 15:18
 */
import type { Controllers } from '../gismap-modules'
import type { IMap } from '../IMap'
import type { ControllerAdapter } from './base'
import 'reflect-metadata'

const controllers = new Map<string, Constructor<ControllerAdapter<unknown>>[]>()

export function setupControl<M, T extends IMap<M>>(Target: new (...args) => T) {
    const name = Reflect.get(Target, 'name') as string
    const controls = controllers.get(name)

    // --------------------------------替换构造函数
    const constructor = function Constructor(...args) {
        const target = new Target(...args)
        const controllersObj: Partial<Controllers<typeof Target>> = {}
        if (controls && controls.length > 0) {
            controls.forEach((Control) => {
                const control = new Control(target.instance)
                control.getControl = target.getControl.bind(target) as typeof control.getControl
                controllersObj[Reflect.get(Control, 'name')] = control
            })
        }
        target.controllers = controllersObj as Controllers<M>
        target.onLoaded().then(() => {
            for (const [_, control] of Object.entries(controllersObj))
                control.setup()
        })
        return target
    } as unknown as Constructor<T>
    constructor.prototype = Target.prototype
    return constructor
}

export function controller(customMapName: string) {
    const map = controllers.get(customMapName)
    return (target: Constructor<ControllerAdapter<unknown>>) => {
        if (map === undefined || map.length <= 0)
            controllers.set(customMapName, [target])
        else
            map.push(target)
    }
}
