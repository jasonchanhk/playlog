import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface PlayerState {
    jersey: string;
    name: string;
    team: string;
    made: {
        onePoint: number;
        twoPoint: number;
        threePoint: number;
    };
    missed: {
        onePoint: number;
        twoPoint: number;
        threePoint: number;
    };
    rebound?: {
        offensive: number;
        defensive: number;
    }
    assist?: number;
    steal?: number;
    turnover?: number;
    foul: number
}

// Define the initial state using that type
const initialState: PlayerState[] = [
    { name: 'Sean', jersey: '6', team: 'Westman', made: { onePoint: 0, twoPoint: 0, threePoint: 0}, missed: { onePoint: 0, twoPoint: 0, threePoint: 0}, rebound : {offensive: 0, defensive: 0}, assist: 0, steal: 0, turnover: 0, foul: 0 },
    { name: 'MM',  jersey: '9', team: 'Westman', made: { onePoint: 0, twoPoint: 0, threePoint: 0}, missed: { onePoint: 0, twoPoint: 0, threePoint: 0}, rebound : {offensive: 0, defensive: 0}, assist: 0, steal: 0, turnover: 0, foul: 0 },
    { name: 'Michael', jersey: '2', team: 'Westman', made: { onePoint: 0, twoPoint: 0, threePoint: 0}, missed: { onePoint: 0, twoPoint: 0, threePoint: 0}, rebound : {offensive: 0, defensive: 0}, assist: 0, steal: 0, turnover: 0, foul: 0 },
    { name: 'Samuel', jersey: '7', team: 'Westman', made: { onePoint: 0, twoPoint: 0, threePoint: 0}, missed: { onePoint: 0, twoPoint: 0, threePoint: 0}, rebound : {offensive: 0, defensive: 0}, assist: 0, steal: 0, turnover: 0, foul: 0 },
    { name: 'Gabriel', jersey: '21', team: 'Westman', made: { onePoint: 0, twoPoint: 0, threePoint: 0}, missed: { onePoint: 0, twoPoint: 0, threePoint: 0}, rebound : {offensive: 0, defensive: 0}, assist: 0, steal: 0, turnover: 0, foul: 0 },
    { name: 'Pong', jersey: '67', team: 'Sutton', made: { onePoint: 0, twoPoint: 0, threePoint: 0}, missed: { onePoint: 0, twoPoint: 0, threePoint: 0}, rebound : {offensive: 0, defensive: 0}, assist: 0, steal: 0, turnover: 0, foul: 0 },
    { name: 'Sing',  jersey: '18', team: 'Sutton', made: { onePoint: 0, twoPoint: 0, threePoint: 0}, missed: { onePoint: 0, twoPoint: 0, threePoint: 0}, rebound : {offensive: 0, defensive: 0}, assist: 0, steal: 0, turnover: 0, foul: 0 },
    { name: 'Nick', jersey: '2', team: 'Sutton', made: { onePoint: 0, twoPoint: 0, threePoint: 0}, missed: { onePoint: 0, twoPoint: 0, threePoint: 0}, rebound : {offensive: 0, defensive: 0}, assist: 0, steal: 0, turnover: 0, foul: 0 },
    { name: 'Leo', jersey: '38', team: 'Sutton', made: { onePoint: 0, twoPoint: 0, threePoint: 0}, missed: { onePoint: 0, twoPoint: 0, threePoint: 0}, rebound : {offensive: 0, defensive: 0}, assist: 0, steal: 0, turnover: 0, foul: 0 },
    { name: 'Bernad', jersey: '13', team: 'Sutton', made: { onePoint: 0, twoPoint: 0, threePoint: 0}, missed: { onePoint: 0, twoPoint: 0, threePoint: 0}, rebound : {offensive: 0, defensive: 0}, assist: 0, steal: 0, turnover: 0, foul: 0 }
];

export const PlayerSlice = createSlice({
    name: 'PlayerAction',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        shot: (state, action) => {
            let point: 'onePoint' | 'twoPoint' | 'threePoint' = action.payload.point;
            let type: 'made' | 'missed' = action.payload.type;
            let objIndex: number = state.findIndex((obj => obj.name == action.payload.name));
            state[objIndex][type][point] = state[objIndex][type][point] + 1;
        }
    }
})

export const { shot } = PlayerSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const countActionHistory = (state: RootState) => state.actionHistory.length
export const showAllPlayerAction = (state: RootState) => state.player

export default PlayerSlice.reducer