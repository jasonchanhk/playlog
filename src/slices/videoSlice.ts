import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { YouTubePlayer } from 'react-youtube';
import { extractVideoIdFromUrl } from '../utils/videoHelper'

// Define a type for the slice state
export interface VideoState {
    videoUrl: string;
    videoId: string;
    videoElement: YouTubePlayer;
}

// Define the initial state using that type
const initialState: VideoState = {
    videoUrl: 'https://www.youtube.com/watch?v=TT-Wul8DD48',
    videoId: 'TT-Wul8DD48',
    videoElement: null
};

export const VideoSlice = createSlice({
    name: 'Video',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        registerVideoElement: (state, action) => {
            state.videoElement = action.payload;
        },
        registerVideoUrl: (state, action) => {
            state.videoUrl = action.payload;
            state.videoId = extractVideoIdFromUrl(action.payload)
        }
    }
})

export const { registerVideoElement, registerVideoUrl } = VideoSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const accessCurrentVideoElement = (state: RootState) => state.video.videoElement
export const accessCurrentVideoId = (state: RootState) => state.video.videoId

export default VideoSlice.reducer