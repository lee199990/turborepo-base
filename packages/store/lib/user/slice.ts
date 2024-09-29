import type { UserState } from './define'
import { NAMESPACE_USER } from './define'
import reducers from './reducers'
import { userCaseCreator } from './thunk'
import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

// 初始化状态(Partial)， 此处使用Partial是因为程序初始化阶段可能为空值
const initialState: Partial<UserState> = {}

// 存储库切片
export const userSlice = createSlice({
    extraReducers: userCaseCreator,
    initialState,
    name: NAMESPACE_USER,
    reducers,
})

export const {
    actions: userActions,
    reducer: userReducer,
} = userSlice

export const persistReducerOfUser
    = persistReducer({ key: NAMESPACE_USER, storage }, userReducer)
