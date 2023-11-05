import { timeStamp } from 'console';
import React, { useState, useEffect } from 'react'
import YouTube, { YouTubePlayer } from 'react-youtube';

interface props {
    url: string;
}

let videoElement: YouTubePlayer = null;

const YTplayer: React.FC<props> = ({ url }) => {

    const [timestamps, setTimestamps] = useState<string[]>([])

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
        const current = videoElement.target.getCurrentTime();
        //YouTubePlayer.getDuraction();
        setTimestamps(prev => [...prev, current]);
    }

    const _onReady = (event: YouTubePlayer) => {
        videoElement = event;
    };

    return (
        <div>
            <YouTube videoId={url} opts={opts} onReady={_onReady} />
            <button type='button' onClick={handleClick}>Get timestamps</button>
            <ul>
                {timestamps.map(t => {
                    return <li><button onClick={(e) => handleResume(e)} data-value={t}>{t}</button></li>
                })}
            </ul>
        </div>
    )
}

export default YTplayer