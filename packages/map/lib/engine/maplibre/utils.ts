/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/13
 * @Last Modified by:
 * @Last Modified time: 2023/12/13 19:32
 */

export function checkCoordinateIs3857(x: number, y: number) {
    return (x >= -20037508.34 && x <= 20037508.34) || (y >= -20037508.34 && y <= 20037508.34)
}

export function checkCoordinateIs4326(lon: number, lat: number) {
    return (lon >= -180 && lon <= 180) || (lat >= -90 && lat <= 90)
}
