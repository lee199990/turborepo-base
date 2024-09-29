import antFu from '@antfu/eslint-config'
import { jsx } from './rules/jsx.js'
import { pub } from './rules/pub.js'
import { javascript } from './rules/javascript.js'

export * from '@antfu/eslint-config'

// 缩进
const indent = 4
// 引号
const quotes = 'single'

export function reactAppLint(...configs) {
    return antFu({
        formatters: {
            html: true,
            css: true,
            markdown: true,
        },
        ignores: [
            '**/dist',
        ],
        react: true,
        vue: false,
        stylistic: {
            indent,
            quotes,
        },
        typescript: true,
    }, {
        rules: {
            ...pub,
            ...jsx,
            ...javascript,
        },
    }, ...configs)
}
