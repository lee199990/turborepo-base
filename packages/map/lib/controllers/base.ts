/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/19
 * @Last Modified by:
 * @Last Modified time: 2023/12/19 15:02
 */

/**
 * 需要与控制器的类名称完全对应
 */
export enum ControllerName {
    Draw = 'DrawController',
    Event = 'EventsController',
    Layer = 'LayersController',
    Location = 'LocationController',
}

export abstract class ControllerAdapter<M> {
    constructor(protected mapInstance: M) {}

    getControl<T = undefined>(key: ControllerName): T | undefined {
        console.log(`尚未实现此方法:${key}，请确保在初始化完成后调用或联系库维护人员确认是否添加Controller装饰器`)
        return undefined
    }

    /**
     * 控制器在地图初始化完成后将会被调用
     */
    setup() {}

    destroy() {}
}
