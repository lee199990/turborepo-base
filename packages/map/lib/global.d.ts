/*
 * 文件简短说明
 * @Author: 
 * @Date:   2023/12/21
 * @Last Modified by:
 * @Last Modified time: 2023/12/21 9:20
 */

type Constructor<T> = new (...args: any[]) => T

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
}
