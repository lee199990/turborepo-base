/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/6
 * @Last Modified by:
 * @Last Modified time: 2023/12/6 16:39
 */

export function upperObjectKey<T extends Record<string, unknown>>(obj: T) {
    const nextObj = {}
    for (const [key, value] of Object.entries(obj))
        nextObj[key.toUpperCase()] = value

    return nextObj as T
}
