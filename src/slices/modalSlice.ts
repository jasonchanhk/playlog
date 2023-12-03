import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface ModalState {
    assistModal: boolean;
    reboundModal: boolean;
    point?: string;
    id?: string;
    home?: boolean;
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
        toggleAssistModal: (state, action) => {
            state.assistModal = !state.assistModal;
            state.point = action.payload.point;
            state.home = action.payload.home;
            state.id = action.payload.id;
        },
        toggleReboundModal: (state, action) => {
            state.reboundModal = !state.reboundModal;
            state.point = action.payload.point;
            state.home = action.payload.home;
            state.id = action.payload.id;
        },
        reset: (state) => {
            state.assistModal = false;
            state.reboundModal = false;
        }
    }
})

export const { toggleAssistModal,toggleReboundModal, reset  } = ModalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const showModalStatus = (state: RootState) => state.modal

export default ModalSlice.reducer