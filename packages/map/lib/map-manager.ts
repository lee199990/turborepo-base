/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/9
 * @Last Modified by:
 * @Last Modified time: 2023/12/9 14:23
 */

import type { InitConfig } from './config'
import { CustomMapLibre } from './engine/maplibre'
import { CustomOpenLayers } from './engine/openlayer'
import type { IMap } from './IMap'

export enum MapEngine {
    MapLibre,
    OpenLayers,
}

class MapManager {
    maps = new Map<string, IMap>()

    activeMap?: IMap

    create<
        E extends MapEngine,
        R = E extends MapEngine.OpenLayers ? CustomOpenLayers : CustomMapLibre,
    >(
        id: string,
        engine: E,
        config?: InitConfig,
    ): R {
        const mapEngine = (() => {
            if (engine === MapEngine.OpenLayers)
                return new CustomOpenLayers(id, config)

            return new CustomMapLibre(id, config)
        })()
        this.maps.set(id, mapEngine)
        this.activeMap = mapEngine
        return mapEngine as R
    }

    get<T extends IMap>(id: string): T | undefined {
        return (id ? this.maps.get(id) : this.activeMap) as T
    }

    remove(id: string) {
        const instance = this.maps.get(id)
        if (instance === undefined)
            return false

        instance.destroy()
        this.maps.delete(id)
        return true
    }

    destroy() {
        this.maps.forEach((map) => {
            map.destroy()
        })
    }
}

export const mapManager = new MapManager()
