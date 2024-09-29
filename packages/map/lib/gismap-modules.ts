/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/19
 * @Last Modified by:
 * @Last Modified time: 2023/12/19 14:45
 */
import type {
    ControllerName,
    DrawControllerAdapter,
    LayersControllerAdapter,
} from './controllers'
import type { EventControllerAdapter } from './controllers/event-controller/event-controller'
import type { LocationControllerAdapter } from './controllers/location-controller/location-controller'

export interface Controllers<M> {
    [ControllerName.Draw]: DrawControllerAdapter<M>
    [ControllerName.Event]: EventControllerAdapter<M>
    [ControllerName.Layer]: LayersControllerAdapter<M>
    [ControllerName.Location]: LocationControllerAdapter<M>
}
