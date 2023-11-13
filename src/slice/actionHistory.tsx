import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface ActionHistoryState {
    playerName: string;
    actionType: string;
    videoTimeStamp: string;
}

// Define the initial state using that type
const initialState: ActionHistoryState[] = [
    {
        playerName: 'Sean',
        actionType: 'twoPointMade',
        videoTimeStamp: 'today'
    }
];

export const ActionHistorySlice = createSlice({
    name: 'ActionHistory',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        addActionHistory: (state, action: PayloadAction<ActionHistoryState>) => {
            state.push(action.payload);
        }
    }
})

export const { addActionHistory } = ActionHistorySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const countActionHistory = (state: RootState) => state.actionHistory.length
export const showAllActionHistory = (state: RootState) => state.actionHistory

export default ActionHistorySlice.reducer