/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 19:01
 */
import type { LayerOptions } from '../../../controllers'
import {
    LayerFormat,
    LayersOperations,
    VectorType,
} from '../../../controllers'
import { createStandardUrl, createSubdomains } from '../../../tools'
import { StyleGenerator } from '../../../utils/styleGenerator/StyleGenerator'
import type {
    AddLayerObject,
    CircleLayerSpecification,
    FillLayerSpecification,
    GeoJSONSourceSpecification,
    ImageSourceSpecification,
    LineLayerSpecification,
    Map,
    RasterSourceSpecification,
    VectorSourceSpecification,
} from 'maplibre-gl'

export abstract class BaseLayer<T extends LayerOptions> extends LayersOperations<Map, T> {
    protected activeLayer!: AddLayerObject

    getOriginalLayer() {
        return this.activeLayer
    }

    addTo() {
        this.mapInstance.addLayer(this.activeLayer)
        return this
    }

    show() {
        this.mapInstance.setLayoutProperty(
            this.id,
            'visibility',
            'visible',
        )
    }

    hide() {
        this.mapInstance.setLayoutProperty(
            this.id,
            'visibility',
            'none',
        )
    }

    remove() {
        super.destroy()
        const layer = this.mapInstance.getLayer(this.id)
        if (layer !== undefined) {
            this.mapInstance.removeLayer(this.id)
            this.mapInstance.removeSource(layer.source)
        }
    }

    protected checkSourceExist(source: string) {
        const exist = this.mapInstance.getSource(source) !== undefined
        if (exist)
            throw new Error(`图层已经存在，无法重复添加，对于相同的图层重复添加是没有必要的:${source}`)
    }

    protected getTileUrls(params: object) {
        const standardUrl = createStandardUrl(this.options.url, params)
        return createSubdomains(standardUrl, this.options.subdomains)
    }

    protected getSourceTypeByFormat() {
        const { format } = this.options
        switch (format) {
            case LayerFormat.Geojson:
                // throw new Error(
                //     'maplibre暂不支持加载在线的geojson格式矢量瓦片，请考虑使用其他格式如MVT'
                // );
                return 'geojson'
            case LayerFormat.Mvt:
                return 'vector'
            case LayerFormat.Png:
            default:
                return 'raster'
        }
    }

    // ---------------------getSourceOption start---------------------

    protected getSourceOption(type: 'vector' | 'raster', params) {
        const { maxZoom, minZoom } = this.options
        return {
            maxzoom: maxZoom ?? this.mapInstance.getMaxZoom(),
            minzoom: minZoom ?? this.mapInstance.getMinZoom(),
            tiles: this.getTileUrls(params),
            type,
        }
    }

    // ---------------------getSourceOption end---------------------

    protected addLayerForVector(params: object, other?: { tms?: boolean }) {
        const {
            bounds,
            layer,
            vectorType = VectorType.Line,
            zIndex = 0,
        } = this.options

        const source = this.getSourceOption('vector', params) as VectorSourceSpecification

        if (other?.tms && source.type === 'vector')
            source.scheme = 'tms'

        if (bounds !== undefined && source.type === 'vector')
            source.bounds = bounds

        const style = (() => {
            switch (vectorType) {
                case VectorType.Line:
                    return { 'line-color': '#274f9d', 'line-width': 2 } as LineLayerSpecification['paint']
                case VectorType.Fill:
                    return { 'fill-color': 'rgba(108,154,230,0.75)', 'fill-outline-color': '#0b1f45' } as FillLayerSpecification['paint']
                case VectorType.Circle:
                default:
                    return { 'circle-color': '#ffa500', 'circle-radius': 5 } as CircleLayerSpecification['paint']
            }
        })()
        const styleGenerator = new StyleGenerator(vectorType, this.options.style)
        return {
            'id': this.id,
            'paint': styleGenerator.maplibrePaint(),
            source,
            'source-layer': layer,
            'type': vectorType,
            zIndex,
        } as AddLayerObject
    }

    protected addLayerForGeojson(other?: { tms?: boolean }) {
        const {
            layer,
            vectorType = 'line',
            zIndex,
        } = this.options
        const source: GeoJSONSourceSpecification = { data: this.options.url, type: 'geojson' }

        return {
            id: this.id,
            source,
            type: 'line',
            zIndex,
        } as AddLayerObject
    }

    protected addLayerForRaster(params: object, other?: { tms?: boolean }) {
        const { bounds, zIndex = 0 } = this.options
        const source = this.getSourceOption('raster', params) as RasterSourceSpecification
        if (other && other.tms)
            source.scheme = 'tms'

        if (bounds !== undefined)
            source.bounds = bounds

        return {
            id: this.id,
            source,
            type: 'raster',
            zIndex,
        } as AddLayerObject
    }

    // FIXME: 暂不可用，获取的单张图片有翻转问题
    protected addLayerForImage(params: Record<string, string | number>) {
        const { bounds } = this.options
        if (bounds === undefined || bounds.length < 4)
            throw new Error('Wms图层类型为Image时，必须指定coordinates')

        const [
            west,
            south,
            east,
            north,
        ] = bounds
        params.srs = 'EPSG:4326'
        params.bbox = `${west},${south},${east},${north}`
        params.width = this.mapInstance.getCanvas().width
        params.height = this.mapInstance.getCanvas().height

        const source: ImageSourceSpecification = {
            coordinates: [
                [east, south],
                [west, south],
                [east, north],
                [west, north],
            ],
            type: 'image',
            url: this.getTileUrls(params)[0],
        }
        const sourceId = `${this.id}-source`
        this.mapInstance.addSource(sourceId, source)
        this.mapInstance.addLayer({
            id: this.id,
            source: sourceId,
            type: 'raster',
        })
    }
}
