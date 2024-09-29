/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/9
 * @Last Modified by:
 * @Last Modified time: 2023/12/9 14:22
 */
import { InitConfig } from './config'
import type { ControllerName } from './controllers'
import type { ControllerAdapter } from './controllers/base'
import type { MapStatusAdapter } from './controllers/map-status/map-status'
import type { Controllers } from './gismap-modules'

export abstract class IMap<T = unknown, C extends Controllers<T> = Controllers<T>> {
    instance: T

    controllers!: C

    status!: MapStatusAdapter<T>

    protected constructor(container: string, option: InitConfig = new InitConfig()) {
        this.instance = this.setup(container, option)
    }

    protected abstract setup(container: string, option: InitConfig): T

    abstract onLoaded(): Promise<void>

    getControl<K extends ControllerName>(key: K): (typeof this.controllers)[K] {
        return this.controllers[key]
    }

    destroy() {
        for (const [_, control] of Object.entries(this.controllers) as ControllerAdapter<any>[][])
            control.destroy()
    }
}
