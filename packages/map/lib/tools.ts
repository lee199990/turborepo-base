/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/9
 * @Last Modified by:
 * @Last Modified time: 2023/12/9 15:50
 */
import { objectToQueryParams } from '@jmrepo/utils'

/**
 * 创建一个URL数组，将每个子域名替换为给定的值。
 *
 * @param {string} url - 包含子域名占位符'{s}'的URL模板。
 * @param {string[]} subdomains - 要替换占位符的子域名值数组。
 * @return {string[]} - 包含替换后的每个子域名的URL数组。
 */
export function createSubdomains(url: string, subdomains?: string[]): string[] {
    return subdomains && subdomains.length > 0
        ? subdomains.map(subdomain => url.replace('{s}', subdomain))
        : [url]
}

/**
 * 使用给定的URL和查询参数创建一个标准URL。请注意，不会转义特殊字符
 *
 * @param {string} url - 要附加查询参数的URL。
 * @param {object} params - 包含查询参数的对象。
 * @return {string} 附加了查询参数的修改后的URL。
 */
export function createStandardUrl<T extends object>(url: string, params: T): string {
    return (
        url
        + (!url.includes('?') ? '?' : '&')
        + decodeURIComponent(objectToQueryParams(params))
    )
}
