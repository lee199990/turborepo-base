import type { $NameState } from './define'
import { NAMESPACE_$NAME } from './define'
import reducers from './reducers'
import { $nameCaseCreator } from './thunk'
import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

// 初始化状态(Partial)， 此处使用Partial是因为程序初始化阶段可能为空值
const initialState: Partial<$NameState> = {}

// 存储库切片
export const $nameSlice = createSlice({
    extraReducers: $nameCaseCreator,
    initialState,
    name: NAMESPACE_$NAME,
    reducers,
})

export const {
    actions: $nameActions,
    reducer: $nameReducer,
} = $nameSlice

export const persistReducerOf$Name
    = persistReducer({ key: NAMESPACE_$NAME, storage }, $nameReducer)
