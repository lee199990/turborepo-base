import type { UserState } from './define'
import { NAMESPACE_USER } from './define'
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

/**
 * 定义异步方法, 调用的方式是store.dispatch(AsyncThunk名称(payloadCreator参数))，返回promise
 * 以下定义用于测试可用性，建议在生产环境中删除
 */
export const testFn = createAsyncThunk(
    `${NAMESPACE_USER}/testFn`,
    async (mode: 'fulfill' | 'fail', thunkAPI) => {
        // 此处可以使用http或其他异步操作
        console.log('当前state:', thunkAPI.getState())
        // thunkAPI能获取到state，执行其他方法或者取消等操作
        if (mode === 'fail')
            throw new Error('失败测试')

        return 'fulfill'
    },
)

/**
 * 通过 builder.addCase来监听特定情况下的回调 函数返回state(修改)或者void(无事发生)
 * 如fulfilled（成功时）应该怎么做
 * @param builder
 */
export function userCaseCreator(builder: ActionReducerMapBuilder<UserState>) {
    // 成功
    builder.addCase(testFn.fulfilled, (state, action) => {
        console.log('异步测试成功：', action.payload)
        return state
    })
    builder.addCase(testFn.rejected, (state, action) => {
        console.log('异步测试失败：', action.payload)
    })
}
