/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/7
 * @Last Modified by:
 * @Last Modified time: 2023/12/7 15:10
 */

export interface Keyword {
    'ows:Keyword': string[]
}

export interface FeatureType {
    abstract: string
    defaultCRS: string
    Keywords: Keyword
    name: string
    title: string
    WGS84BoundingBox: [number, number, number, number]
}

export type FeatureTypeList = FeatureType[]

export enum WFSRequest {
    DescribeFeatureType = 'DescribeFeatureType',
    // https://www.yuque.com/u32025933/xrt2zf/xt7odmm9qpge9im7#lacHI
    GetCapabilities = 'GetCapabilities',
    GetFeature = 'GetFeature',
    Transaction = 'Transaction',
}
