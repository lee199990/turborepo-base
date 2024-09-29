export abstract class BaseRest<P = unknown, R extends NonNullable<object> = NonNullable<object>> {
    abstract url: string

    params?: P

    result?: R

    // 如果需要处理返回的参数，比如转换大小写或重新排序则实现这个方法
    execute?(res: R): R
}
