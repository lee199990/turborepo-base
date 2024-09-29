/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 19:08
 */
import type { LayerOptions } from '../../../controllers'
import {
    LayerFormat,
    LayersOperations,
    VectorType,
} from '../../../controllers'
import { createStandardUrl, createSubdomains } from '../../../tools'
import { StyleGenerator } from '../../../utils/styleGenerator/StyleGenerator'
import type { Map } from 'ol'
import { getTopLeft } from 'ol/extent'
import { GeoJSON, MVT } from 'ol/format'
import type { Layer } from 'ol/layer'
import { Tile } from 'ol/layer'
import VectorTileLayer from 'ol/layer/VectorTile'
import type { TileImage } from 'ol/source'
import { VectorTile } from 'ol/source'
import type { Options } from 'ol/source/VectorTile'
import { createForProjection } from 'ol/tilegrid'
import WMTSTileGrid from 'ol/tilegrid/WMTS'

export abstract class BaseLayer<
    T extends LayerOptions & { params?: object },
> extends LayersOperations<Map, T> {
    protected activeLayer!: Layer

    addTo(): this {
        this.mapInstance.addLayer(this.activeLayer)
        return this
    }

    getOriginalLayer() {
        return this.activeLayer
    }

    hide(): void {
        this.activeLayer.setVisible(false)
    }

    remove(): void {
        const layer = this.activeLayer
        if (layer)
            this.mapInstance.removeLayer(layer)
    }

    show(): void {
        this.activeLayer.setVisible(true)
    }

    protected getTileGrid() {
        const view = this.mapInstance.getView()
        const projection = view.getProjection()
        const tileGrid = createForProjection(projection, view.getMaxZoom())
        const code = projection.getCode()
        const resolutions = tileGrid.getResolutions()
        const extent = projection.getExtent()
        if (projection.getCode() === 'EPSG:4326')
            resolutions.shift()

        const matrixIds = Array.from({ length: resolutions.length })
        for (let z = 0; z < resolutions.length; z += 1)
            matrixIds[z] = `${code}:${z}`

        return new WMTSTileGrid({
            extent,
            matrixIds,
            origin: getTopLeft(extent),
            resolutions,
        })
    }

    protected createLayerForVecTile(paramsObj: object, other?: { tms?: boolean }) {
        const projection = this.mapInstance.getView().getProjection()
        const {
            bounds,
            format,
            layer,
            maxZoom,
            minZoom,
            subdomains,
            url,
            vectorType = VectorType.Line,
            zIndex,
        } = this.options
        const isMvt = format === LayerFormat.Mvt
        const sourceOption: Options = {
            format: isMvt ? new MVT() : new GeoJSON(),
            projection,
            // url,
            tileGrid: this.getTileGrid(),
        }

        if (other?.tms) {
            const code = projection.getCode()
            const tileUrlFunction = type => (tileCoord) => {
                return `${url}:${layer}@${code}@${type}/${tileCoord[0]}/${tileCoord[1]}/${
                    2 ** tileCoord[0] - tileCoord[2] - 1
                }.pbf`
            }
            if (isMvt)
                sourceOption.tileUrlFunction = tileUrlFunction('pbf')

            if (format === LayerFormat.Geojson)
                sourceOption.tileUrlFunction = tileUrlFunction('geojson')
        }
        else {
            // sourceOption.tileGrid = this.getTileGrid();
            sourceOption.url = createStandardUrl(url, paramsObj)
            sourceOption.urls = createSubdomains(sourceOption.url, subdomains)
        }

        const source = new VectorTile(sourceOption)
        const styleGenerator = new StyleGenerator(vectorType, this.options.style)
        return new VectorTileLayer({
            extent: bounds,
            maxZoom,
            minZoom,
            properties: { id: this.id },
            source,
            style: feature => styleGenerator.openlayersStyle(feature),
            zIndex,
        })
    }

    protected addLayerForRaster(source: TileImage) {
        const {
            bounds,
            maxZoom,
            minZoom,
            zIndex,
        } = this.options
        return new Tile({
            extent: bounds,
            maxZoom,
            minZoom,
            properties: { id: this.id },
            source,
            zIndex,
        })
    }
}
