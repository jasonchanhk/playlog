import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { YouTubePlayer } from 'react-youtube';

// Define a type for the slice state
export interface YouTubePlayerState {
    videoElement: YouTubePlayer;
}

// Define the initial state using that type
const initialState: YouTubePlayerState = {
    videoElement: null
};

export const YouTubePlayerSlice = createSlice({
    name: 'YouTubePlayer',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        registerVideoElement: (state, action: PayloadAction<YouTubePlayerState>) => {
            state.videoElement = action.payload;
        }
    }
})

export const { registerVideoElement } = YouTubePlayerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const accessCurrentVideoElement = (state: RootState) => state.youtubePlayer.videoElement

export default YouTubePlayerSlice.reducer