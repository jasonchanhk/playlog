import React from 'react'
import YouTube, { YouTubePlayer } from 'react-youtube';
import { useAppDispatch, useAppSelector } from '../hooks'
import { accessCurrentVideoId, registerVideoElement } from '../slices/videoSlice'

let videoElement: YouTubePlayer = null;

const VideoPlayer: React.FC = () => {

    const dispatch = useAppDispatch();
    const videoId = useAppSelector(accessCurrentVideoId);
    const opts = {
        height: '390',
        width: '640'
    };

    const _onReady = (event: YouTubePlayer) => {
        dispatch(registerVideoElement(event));
        videoElement = event;
    };

    return <YouTube videoId={videoId} className='youtubeContainer' onReady={_onReady} />
}

export default VideoPlayer