/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/7
 * @Last Modified by:
 * @Last Modified time: 2023/12/7 15:41
 */

import type { LayerOptions } from '../layers-operations'
import { LayerFormat } from '../type'
import { isNil, omitBy } from 'lodash-es'

export interface WMSLayerMetadata {
    [key: string]: unknown
    Abstract: string
    BoundingBox: string[]
    CRS: string[]
    EX_GeographicBoundingBox: [number, number, number, number]
    KeywordList: string
    Name: string

    Title: string
}

export interface WMSMetadata {
    [key: string]: unknown
    EX_GeographicBoundingBox: [number, number, number, number]

    Layer: WMSLayerMetadata[]
}

export enum WMSRequest {
    GetCapabilities = 'GetCapabilities',
    GetFeatureInfo = 'GetFeatureInfo',
    GetLegendGraphic = 'GetLegendGraphic',
    GetMap = 'GetMap',
}

export class WMSParams {
    static create(params?: Partial<WMSParams>): WMSParams {
        return { ...new WMSParams(), ...omitBy(params, isNil) }
    }

    version = '1.1.0'

    // 输出结果
    format = LayerFormat.Png

    // 图层样式
    styles = ''

    request = WMSRequest.GetMap

    service = 'WMS'

    // 是否透明
    transparent = true

    // 图层
    layers = ''

    // 图片宽度，地图显示区域的像素尺寸
    width = 256

    // 图片高度，地图显示区域的像素尺寸
    height = 256

    // 坐标系， 支持情况以发布为准
    srs = 'EPSG:4326'

    bbox?: string
}

export interface WmsLayerOption extends LayerOptions {
    layer: string
    requestStyle?: string
    requestVersion?: string
    transparent?: boolean
}
