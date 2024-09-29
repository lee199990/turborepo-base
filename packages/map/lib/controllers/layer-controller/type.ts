// eslint-disable-next-line @typescript-eslint/no-explicit-any
import type { StyleOptions } from '../../utils/styleGenerator/StyleGenerator'

export type Metadata = any

export enum LayerServerType {
    LocalGeoJSON = 'LocalGeoJSON',
    Tms = 'Tms',
    Wms = 'Wms',
    Wmts = 'Wmts',
}

export enum LayerSourceType {
    Geojson = 'geojson',
    // 栅格瓦片, 图片切片
    Raster = 'raster',
    // 矢量图层 如geojson， mvt
    Vector = 'vector',
}

export enum VectorType {
    Circle = 'circle',
    Fill = 'fill',
    Line = 'line',
    Symbol = 'symbol',
}

export enum LayerFormat {
    Geojson = 'application/json;type=geojson',
    Jpg = 'image/jpeg',
    Mvt = 'application/vnd.mapbox-vector-tile',
    Png = 'image/png',
}

export function getLayerTypeByFormat(format: LayerFormat): LayerSourceType {
    switch (format) {
        case LayerFormat.Mvt:
            return LayerSourceType.Vector
        case LayerFormat.Geojson:
            return LayerSourceType.Geojson
        case LayerFormat.Jpg:
        case LayerFormat.Png:
        default:
            return LayerSourceType.Raster
    }
}

export interface ViewItem { name: string, type?: VectorType }

export interface VectorOption {
    format: LayerFormat.Mvt | LayerFormat.Geojson
    view: ViewItem[]
}

export interface RasterOption {
    format: LayerFormat.Jpg | LayerFormat.Png
    layers: string[]
}

export interface customStyle {
    style?: StyleOptions
}

export type GroupOption = {
    groupId: string
    url: string
    subdomains?: string[]
    // wms服务是否合并请求图层，如果为true,将传入的图层合并为一层，图层id变为${groupId}:merge-all,其他服务无效
    merge?: boolean
} & (VectorOption | RasterOption) &
customStyle
