import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface TimerState {
    initialTime: number;
    timeLeft: number;
    totalQuarter: number;
    currentQuarter: number;
}

// Define the initial state using that type
const initialState: TimerState = {
    initialTime: 12 * 60,
    timeLeft: 12 * 60,
    totalQuarter: 4, 
    currentQuarter: 1
};

export const TimerSlice = createSlice({
    name: 'Timer',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        start: (state) => {
            state.timeLeft = state.timeLeft - 1;
        },
        reset: (state) => {
            state.timeLeft = state.initialTime;
            state.currentQuarter = (state.currentQuarter < state.totalQuarter ? state.currentQuarter + 1 : state.currentQuarter) 
        },
        set: (state, action) => {
            state.timeLeft = action.payload.newTime
            state.currentQuarter = (action.payload.newQuarter <= state.totalQuarter ? action.payload.newQuarter : state.currentQuarter)
        }
    }
})

export const { start, reset, set } = TimerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const accessTimeLeft = (state: RootState) => state.timer.timeLeft
export const accessTimerState = (state: RootState) => state.timer

export default TimerSlice.reducer