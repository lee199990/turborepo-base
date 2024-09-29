export class SharedResult<T = NonNullable<object>> {
    code!: string

    msg!: string

    data!: T

    constructor() {
        this.code = '200'
        this.msg = ''
        this.data = {} as T
    }
}
