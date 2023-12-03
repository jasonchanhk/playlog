import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface ModalState {
    assistModal: boolean;
    reboundModal: boolean;
}

// Define the initial state using that type
const initialState: ModalState = {
    assistModal: false,
    reboundModal: false
};


export const ModalSlice = createSlice({
    name: 'Modal',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        toggleAssistModal: (state) => {
            state.assistModal = !state.assistModal;
        },
        toggleReboundModal: (state) => {
            state.reboundModal = !state.reboundModal;
        }
    }
})

export const { toggleAssistModal,toggleReboundModal  } = ModalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const showModalStatus = (state: RootState) => state.modal

export default ModalSlice.reducer