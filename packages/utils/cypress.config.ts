import viteConfig from './vite.config'
import task from '@cypress/code-coverage/task'
import { defineConfig } from 'cypress'
import plugin from 'cypress-mochawesome-reporter/plugin'

export default defineConfig({
    component: { devServer: { bundler: 'vite', framework: 'react', viteConfig }, setupNodeEvents(on, config) {
        // eslint-disable-next-line ts/no-unsafe-call
        plugin(on)
        task(on, config)
        return config
        // implement node event listeners here
    } },
    e2e: { setupNodeEvents(on, config) {
        // e2e默认使用内置webpack，需要统一为vite
        // eslint-disable-next-line ts/no-unsafe-call
        plugin(on)
        task(on, config)
        return config
        // implement node event listeners here
    } },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        charts: true,
        embeddedScreenshots: true,
        inlineAssets: true,
        reportDir: 'cypress/reports',
        reportPageTitle: '测试报告',
    },
    video: false,
})
