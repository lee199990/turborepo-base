import { NAMESPACE_USER, persistReducerOfUser } from './user'
import type { Reducer } from '@reduxjs/toolkit'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const slices = {
    [NAMESPACE_USER]: persistReducerOfUser,
}
const reducer = combineReducers(slices)
export const pubSingleStore = configureStore({
    devTools: import.meta.env.DEV,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
        },
    }),
    reducer,
})

export function replaceReducer(slice: { [key: string]: Reducer }) {
    const next = combineReducers({
        ...slices,
        ...slice,
    })
    pubSingleStore.replaceReducer(next)
    return pubSingleStore
}
