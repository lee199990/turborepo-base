/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/6
 * @Last Modified by:
 * @Last Modified time: 2023/12/6 10:19
 */

export function objectToQueryParams<T extends Record<string, string | number | boolean>>(obj: T): string {
    const params = new URLSearchParams()
    Object.entries(obj).forEach(([key, value]) => {
        if (value !== null && value !== undefined)
            params.append(key, value.toString())
    })
    return params.toString()
}
