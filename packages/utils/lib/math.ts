/*
 * 数学操作
 * @Author: 
 * @Date:   2024/1/5
 * @Last Modified by:
 * @Last Modified time: 2024/1/5 11:40
 */

/**
 * 将数字转换为指定小数位数的字符串
 * @param value
 * @param num
 * @param zeroSpaced
 */
export function toFloor(
    value: number,
    num = 2,
    zeroSpaced = false,
) {
    if (!value)
        return '0'
    const multi = 10 ** num
    let result = (Math.floor(value * multi) / multi).toString()
    const length = result.length - result.indexOf('.') - 1
    if (zeroSpaced && num - length > 0)
        result += '0'.repeat(num - length)
    return result
}

/**
 * 根据输入的X，返回X在MIN和MAX的占比
 * @param x
 * @param min
 * @param max
 */
export function proportion(
    x: number,
    min: number,
    max: number,
) {
    if (x <= min)
        return 0
    if (x >= max)
        return 1
    return (x - min) / (max - min)
}

/**
 * 返回min与max之间的随机数
 * @param min   最小值
 * @param max   最大值
 */
export function randomIntThroughRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
