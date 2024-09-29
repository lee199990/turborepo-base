import type { UserState } from './define'
import type { PayloadAction, Reducer } from '@reduxjs/toolkit'

type reducer<S> = Reducer<UserState, PayloadAction<S>>

const update: reducer<UserState> = (state, action) => ({
    ...state,
    ...action.payload,
})

const deleteRow: reducer<string> = (state, action) => {
    delete state?.[action.payload]
    return { ...state }
}

export default {
    deleteRow,
    update,
}
