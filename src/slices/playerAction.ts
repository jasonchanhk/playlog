import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface playerActionState {
    playerName: string;
    twoPointMade: number;
    twoPointMiss: number;
    threePointMade?: number;
    threePointMiss?: number;
    offensiveRebound?: number;
    defensiveRebound?: number;
    assist?: number;
    steal?: number;
    turnover?: number;
}

// Define the initial state using that type
const initialState: playerActionState[] = [
    { playerName: 'Sean', twoPointMade: 0, twoPointMiss: 0 },
    { playerName: 'MM', twoPointMade: 0, twoPointMiss: 0 },
    { playerName: 'Michael', twoPointMade: 0, twoPointMiss: 0 },
    { playerName: 'Samuel', twoPointMade: 0, twoPointMiss: 0 },
    { playerName: 'Gabriel', twoPointMade: 0, twoPointMiss: 0 }
  ];

export const PlayerActionSlice = createSlice({
    name: 'PlayerAction',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        scoreTwoPoints: (state, action: PayloadAction<string>) => {
            let objIndex: number = state.findIndex((obj => obj.playerName == action.payload));
            state[objIndex].twoPointMade = state[objIndex].twoPointMade + 1;
        },
        missTwoPoints: (state, action: PayloadAction<string>) => {
            let objIndex: number = state.findIndex((obj => obj.playerName == action.payload));
            state[objIndex].twoPointMiss = state[objIndex].twoPointMiss + 1;
        },
    }
})

export const { scoreTwoPoints, missTwoPoints } = PlayerActionSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const countActionHistory = (state: RootState) => state.actionHistory.length
export const showAllPlayerAction = (state: RootState) => state.playerAction

export default PlayerActionSlice.reducer