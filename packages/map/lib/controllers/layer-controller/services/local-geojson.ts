/*
 * 文件简短说明
 * @Author: 
 * @Date:   2024/1/19
 * @Last Modified by:
 * @Last Modified time: 2024/1/19 11:31
 */

import type { StyleOptions } from '../../../utils/styleGenerator/StyleGenerator'
import type { LayerOptions } from '../layers-operations'
import type { VectorType } from '../type'
import type {
    Feature,
    FeatureCollection,
    Geometry,
} from 'geojson'

export interface LocalGeoJsonLayerOption {
    geojson: Geometry | Feature | FeatureCollection
    id: string
    style?: StyleOptions
    vectorType?: VectorType
}

export type GeoJsonLayerOption = LocalGeoJsonLayerOption & LayerOptions
