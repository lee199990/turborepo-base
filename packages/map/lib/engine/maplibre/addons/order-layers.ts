/*
 * 此插件将maplibre的图层支持zindex设置
 * @Author: 
 * @Date:   2023/12/8
 * @Last Modified by:
 * @Last Modified time: 2023/12/8 16:50
 */
import type { AddLayerObject, Map } from 'maplibre-gl'

/* eslint-disable */
export function addOrderLayerToMapOut(map: Map) {
    map.orderLayers = function orderLayer(orderLayers) {
        const ly = this.style._layers;
        const layers = Object.keys(ly).map(key => ly[key]);
        const ownLayers: any[] = [];
        const beforeLayers: any[] = [];
        orderLayers.forEach(id => {
            if (id) {
                const l = layers.find(item => item.id === id);
                if (l) {
                    ownLayers.push(l);
                }
            }
        });
        layers.forEach(layer => {
            const l = ownLayers.find(item => item.id === layer.id);
            if (!l) {
                beforeLayers.push(layer);
            }
        });
        const allLayers = beforeLayers.concat(ownLayers);
        this.style._checkLoaded();
        this.style._changed = true;
        this.style._order = allLayers.map(a => a.id);
        this.style._layerOrderChanged = true;
        return allLayers;
    };

    const addLayer = map.addLayer;

    map.addLayer = function(
        layerObject: AddLayerObject,
        before?: string
    ) {
        this.addons = this.addons ?? {};
        this.addons.orderLayers = this.addons.orderLayers ?? {
            layers: [],
            sortLayers: []
        };
        const work = this.addons.orderLayers;
        if (layerObject.id) {
            work.layers.push(layerObject);
        }
        if (!('zIndex' in layerObject)) {
            layerObject['zIndex'] = 0;
        }
        work.sortLayers.push(layerObject);
        const args = addLayer.call(this, layerObject, before);
        const sortLayers = work.sortLayers.sort((a, b) => a.zIndex - b.zIndex);

        this.orderLayers(sortLayers.map(layer => layer.id));
        return args;
    };
}
