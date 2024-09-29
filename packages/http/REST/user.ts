import type { BaseRest } from './base'
import type { SharedResult } from './type'

// 用户登录
export const RestLogin: BaseRest<
    { loginName: string, password: string },
    SharedResult<{ userId: string, ticket: string }>
> = { url: 'basic/user/login' }

// 用户登出
export const RestLogout: BaseRest<null, SharedResult>
    = { execute(res: SharedResult): SharedResult {
    // 此处可以进行一些处理
        return res
    }, url: 'basic/user/logout' }
