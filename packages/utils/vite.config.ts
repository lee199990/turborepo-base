/**
 * 无法抽离此文件，cypress会导入vite config 导致公共部分会识别成CJS
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
    plugins: [
        react(),
        // 声明并导出类型文件
        dts({
            entryRoot: './lib',
            include: 'lib'
        }),
        istanbul({
            cypress: true,
            requireEnv: false,
            forceBuildInstrument: true // Instrument the source code for cypress runs
        })
    ],
    build: {
        // 【摇树优化】输出esm格式的js
        lib: {
            formats: ['es'],
            entry: './lib/index.ts'
        },
        rollupOptions: {
            output: {
                // 【摇树优化】保持模块结构
                preserveModules: true,
                // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
                entryFileNames: '[name].js',
                // 用于命名代码拆分时创建的共享块的输出命名
                chunkFileNames: '[name].js'
            }
        }
    }
});
