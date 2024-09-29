import { resolve } from 'node:path'
import { watch } from 'node:fs'
import type { PluginOption } from 'vite'
import fsExtra from 'fs-extra'

const { copySync, removeSync } = fsExtra

/**
 * 用于在开发环境时，将静态资源复制到public文件夹。
 * 线上环境建议通过nginx转发/shared-assets/这个路径到静态资源文件夹
 * 而不必每个项目都复制一份
 */
export function copySharedAssetsPlugin(target: string, isDev: boolean): PluginOption {
    const targetTo = `${target}/shared-assets`
    const source = resolve(__dirname, '../packages/shared-assets')
    // console.log(source, fs);
    return {
        name: 'copy-shared-assets',
        buildStart() {
            removeSync(targetTo)
            if (isDev) {
                copySync(source, targetTo)
                console.log('正在监听共享资源目录')
                watch(source, (event, filename) => {
                    console.log('共享资源目录变更', event, filename)
                    // 跳过缓存文件
                    if (filename?.substring(filename.length - 1) !== '~') {
                        removeSync(targetTo)
                        copySync(source, targetTo)
                    }
                })
            }
        },
    }
}
