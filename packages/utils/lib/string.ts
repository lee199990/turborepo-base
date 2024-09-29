/*
 *
 * @Author: 
 * @Date:   2024/1/6
 * @Last Modified by:
 * @Last Modified time: 2024/1/6 9:25
 */

/**
 * 将字符串按照指定长度分割成数组
 * @param str           原始字符串
 * @param splitLength   切分长度
 */
export function specifyLengthDivision(str: string, splitLength: number) {
    const strArr: string[] = []
    for (let i = 0; i < str.length; i += splitLength)
        strArr.push(str.slice(i, i + splitLength))
    return strArr
}
