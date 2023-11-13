import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { formatElapsedTime } from '../utils/datetimeHelper';

// Define a type for the slice state
export interface ActionHistoryState {
    playerName: string;
    home: boolean;
    actionType: string;
    videoElapsedTimeStamp: string;
    videoFormattedTimeStamp: string;
}

// Define the initial state using that type
const initialState: ActionHistoryState[] = [];

export const ActionHistorySlice = createSlice({
    name: 'ActionHistory',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        addActionHistory: (state, action) => {
            const {playerName, actionType, videoElapsedTimeStamp } = action.payload;
            state.push({
                home: true,
                playerName: playerName,
                actionType: actionType,
                videoElapsedTimeStamp: videoElapsedTimeStamp,
                videoFormattedTimeStamp: formatElapsedTime(action.payload.videoElapsedTimeStamp)
            });
        }
    }
})

export const { addActionHistory } = ActionHistorySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const countActionHistory = (state: RootState) => state.actionHistory.length
export const showAllActionHistory = (state: RootState) => state.actionHistory

export default ActionHistorySlice.reducer