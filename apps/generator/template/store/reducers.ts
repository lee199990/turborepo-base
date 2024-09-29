import type { $NameState } from './define'
import type { PayloadAction, Reducer } from '@reduxjs/toolkit'

type reducer<S> = Reducer<$NameState, PayloadAction<S>>

const update: reducer<$NameState> = (state, action) => ({
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
