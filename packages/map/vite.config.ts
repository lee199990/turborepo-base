import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import istanbul from 'vite-plugin-istanbul'

export default defineConfig({ build: {
    // 【摇树优化】输出esm格式的js
    lib: { entry: './lib/index.ts', formats: ['es'] },
    rollupOptions: { output: {
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: '[name].js',
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: '[name].js',
        // 【摇树优化】保持模块结构
        preserveModules: true,
    } }}, plugins: [
    react(),
    // 声明并导出类型文件
    dts({ entryRoot: './lib', include: 'lib' }),
    istanbul({
        cypress: true,
        forceBuildInstrument: true, // Instrument the source code for cypress runs
        requireEnv: false,
    }),
] })
