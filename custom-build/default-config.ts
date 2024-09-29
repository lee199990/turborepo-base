import { resolve } from 'node:path'
import react from '@vitejs/plugin-react-swc'
import type { UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { copySharedAssetsPlugin } from './copy.plugin'
import { createProxy, handleEnv } from './config-define'

/**
 * 默认的vite 配置
 * @param mode  运行模式
 * @param dir   调用者的路径 一般是__dirname
 */
export function defaultConfig(mode: string, dir: string): UserConfig {
    const env = handleEnv(loadEnv(mode, resolve(dir, 'env')))
    const isDev = mode === 'development'

    return {
        base: env.VITE_CONTEXT_PATH,
        envDir: resolve(dir, 'env'),
        resolve: { alias: { '@': resolve(dir, 'src') } },
        plugins: [
            // 如果使用了装饰器语法，@vitejs/plugin-react-swc 必须传入参数 {tsDecorators: true}
            react({ tsDecorators: true }),
            copySharedAssetsPlugin(resolve(dir, 'public'), isDev),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "../../packages/shared-styles/variable" as *;`,
                },
            },
        },
        server: {
            port: env.VITE_PORT,
            host: '0.0.0.0',
            hmr: true,
            proxy: createProxy(env.VITE_SERVICE_PROXY, env.VITE_PROXY_TARGET),
        },
        build: {
            sourcemap: false,
            rollupOptions: {
                output: {
                    // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
                    entryFileNames: 'js/[name].[hash].js',
                    // 用于命名代码拆分时创建的共享块的输出命名
                    chunkFileNames: 'js/[name].[hash].js',
                },
            },
        },
        define: {
            'process.env': { mode, isDev },
        },
    }
}
