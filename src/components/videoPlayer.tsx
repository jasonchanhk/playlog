import React, { useState, useEffect } from 'react'
import YouTube, { YouTubePlayer } from 'react-youtube';
import { useAppDispatch, useAppSelector } from '../hooks'
import { accessCurrentVideoId, registerVideoElement } from '../slices/videoSlice'

interface timestamp {
    formattedTime: string;
    elapsedTime: string;
}

let videoElement: YouTubePlayer = null;

const VideoPlayer: React.FC = () => {

    const [timestamps, setTimestamps] = useState<timestamp[]>([])
    const dispatch = useAppDispatch();
    const videoId = useAppSelector(accessCurrentVideoId);
    const opts = {
        height: '390',
        width: '640'
    };

    const handleResume = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetTimestamp = (e.target as HTMLButtonElement).getAttribute('data-value');
        videoElement.target.seekTo(targetTimestamp);
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const elapsed_seconds = videoElement.target.getCurrentTime();
        const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
        const min = Math.floor(elapsed_milliseconds / 60000);
        const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);
        const formattedCurrentTime = min.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
        setTimestamps(prev => [...prev, { formattedTime: formattedCurrentTime, elapsedTime: elapsed_seconds }]);
    }

    const _onReady = (event: YouTubePlayer) => {
        dispatch(registerVideoElement(event));
        videoElement = event;
    };

    return (
        <div>
            <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
            <button type='button' onClick={handleClick}>Get timestamps</button>
            <ul>
                {timestamps.map(t => {
                    return <li><button onClick={(e) => handleResume(e)} data-value={t.elapsedTime}>{t.formattedTime}</button></li>
                })}
            </ul>
        </div>
    )
}

export default VideoPlayer