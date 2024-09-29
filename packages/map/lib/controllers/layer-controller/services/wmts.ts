/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/7
 * @Last Modified by:
 * @Last Modified time: 2023/12/7 14:41
 */

import type { LayerOptions } from '../layers-operations'
import { LayerFormat } from '../type'
import { isNil, omitBy } from 'lodash-es'

export enum WMTSRequest {
    GetCapabilities = 'GetCapabilities',
    GetFeatureInfo = 'GetFeatureInfo',
    GetLegendGraphic = 'GetLegendGraphic',
    GetTile = 'GetTile',
}

export class WMTSParams {
    static create(params?: Partial<WMTSParams>): WMTSParams {
        return { ...new WMTSParams(), ...omitBy(params, isNil) } as WMTSParams
    }

    version = '1.1.0'

    // 输出结果
    format = LayerFormat.Png

    // 图层样式
    style = ''

    request = WMTSRequest.GetTile

    layer = ''

    service = 'WMTS'

    tileMatrixSet = 'EPSG:3857';

    [key: string]: string;
}

export interface Style {
    Identifier: string
    legendURL: string
}

export interface TileMatrixLimit {
    maxTileCol: number
    maxTileRow: number
    minTileCol: number
    minTileRow: number
    tileMatrix: number
}

export interface TileMatrixSetLink {
    TileMatrixSet: string
    TileMatrixSetLimits: TileMatrixLimit[]
}

export interface WMTSLayerMetadata {
    format: string[]
    Identifier: string
    Infoformat: string[]
    resourceURL: string[]
    style: Style
    TileMatrixSetLink: TileMatrixSetLink[]
    Title: string
    WGS84BoundingBox: [number, number, number, number]
}

/**
 * wmts图层配置选项
 */
export interface WmtsLayerOption extends LayerOptions {
    layer: string
    requestStyle?: string
    requestVersion?: string
}
