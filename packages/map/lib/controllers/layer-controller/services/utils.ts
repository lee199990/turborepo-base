/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/11
 * @Last Modified by:
 * @Last Modified time: 2023/12/11 13:47
 */

import { LayerServerType } from '../type'
import { axiosHttpClient } from '@jmrepo/http'
import { WMSCapabilities, WMTSCapabilities } from 'ol/format'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getMetadata<T = any>(
    url: string,
    type: LayerServerType,
    take?: (obj) => T,
): Promise<T> {
    return axiosHttpClient
        .get<string, void>(`${url}?request=GetCapabilities`)
        .then((xml) => {
            switch (type) {
                case LayerServerType.Wms:
                    return new WMSCapabilities().read(xml)
                case LayerServerType.Wmts:
                    return new WMTSCapabilities().read(xml)
                default:
                    throw new Error(`暂不支持获取${type}元数据`)
            }
        })
        .then(take)
}
