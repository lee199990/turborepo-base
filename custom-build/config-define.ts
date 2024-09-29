import type { ProxyOptions } from 'vite'

export interface ViteEnv {
    // 启动端口VITE_PORT
    VITE_PORT: number
    // 应用程序上下文
    VITE_CONTEXT_PATH: string
    // 接口地址前缀
    VITE_BASE_SERVICE: string
    // 不会被添加前缀的path
    VITE_BASE_SERVICE_FILTER: string[]
    // 接口后台地址
    VITE_SERVICE_PROXY: string
    // 开发环境代理转发的地址
    VITE_PROXY_TARGET: string
}

/**
 * 根据指定的路径和目标生成代理对象。
 *
 * @param {string}   path   - 要代理的路径。
 * @param {string}   target - 代理的目标URL。
 * @return {object}         - 生成的代理对象。
 */
export function createProxy(path: string, target: string): Record<string, string | ProxyOptions> {
    const proxy = {}
    const paths = path.split(',')
    const targets = target.split(',')
    if (paths.length !== targets.length)
        console.log('\x1B[31m%s\x1B[0m', 'proxy配置没有对应!, 超出部分将配置失败')

    paths.forEach((p, i) => {
        if (targets[i])
            proxy[p] = { target: targets[i], changeOrigin: true }
    })
    return proxy
}

export function handleEnv(envConf: Record<string, string>) {
    // 此处为默认值，无需修改
    const ret: ViteEnv = {
        VITE_PORT: 8888,
        VITE_BASE_SERVICE: '',
        VITE_BASE_SERVICE_FILTER: [],
        VITE_CONTEXT_PATH: '',
        VITE_SERVICE_PROXY: '',
        VITE_PROXY_TARGET: '',
    }

    Object.keys(envConf).forEach((index) => {
        switch (index) {
            case 'VITE_PORT':
                ret.VITE_PORT = Number(envConf[index])
                break
            // case 'VITE_LEGACY':
            //     ret.VITE_LEGACY = envConf[index] === 'true';
            //     break;
            default:
                ret[index] = envConf[index]
        }
    })

    return ret
}
