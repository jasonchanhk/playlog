import { createSlice } from '@reduxjs/toolkit'
import { made, missed } from './playerSlice';
import type { RootState } from '../store'
import { pointTranslater } from '../utils/gameHelper';

export interface Coordinate {
    x: number | null;
    y: number | null;
}

export interface ModalState {
    page: number;
    actionType: string | null;
    point?: string | null;
    shotType?: string | null;
    foul?: string;
    rebound?: string;
    assist?: string;
    playerId?: string | null;
    home?: boolean | null;
    videoElapsedTimeStamp?: string | null;
    timeLeft?: number;
    coordinate: Coordinate;
}

// Define the initial state using that action
const initialState: ModalState = {
    page: 0,
    actionType: null,
    foul: 'skip',
    rebound: 'skip',
    assist: 'skip',
    coordinate: { x: null, y: null }
};


export const ModalSlice = createSlice({
    name: 'Modal',
    // `createSlice` will infer the state action from the `initialState` argument
    initialState,
    reducers: {
        next: (state, action) => {
            state.page = state.page + action.payload
        },
        set: (state, action) => {
            let category: 'shotType' | 'foul' | 'rebound' | 'assist' | 'coordinate' = action.payload.category;
            state[category] = action.payload.value;
        },
        save: (state, action) => {
            state.page = 0;
            state.actionType = null;
            state.point = null;
            state.shotType = null;
            state.foul = 'skip';
            state.rebound = 'skip';
            state.assist = 'skip';
            state.playerId = null;
            state.home = null;
            state.videoElapsedTimeStamp = null;
            state.coordinate = { x: null, y: null };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(made, (state, action) => {
            state.actionType = 'made';
            state.point = action.payload.point;
            state.home = action.payload.home;
            state.playerId = action.payload.id;
            state.page = 1;
            state.videoElapsedTimeStamp = action.payload.videoElapsedTimeStamp;
            state.timeLeft = action.payload.timeLeft;
        });
        builder.addCase(missed, (state, action) => {
            state.actionType = 'missed';
            state.point = action.payload.point;
            state.home = action.payload.home;
            state.playerId = action.payload.id;
            state.page = 1;
            state.videoElapsedTimeStamp = action.payload.videoElapsedTimeStamp;
            state.timeLeft = action.payload.timeLeft;
        });
    }
})

export const { set, save, next } = ModalSlice.actions

// Other code such as selectors can use the imported `RootState` action
export const showModalStatus = (state: RootState) => state.modal

export default ModalSlice.reducer