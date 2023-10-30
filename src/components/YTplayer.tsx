import React, { useState } from 'react'
import YouTube, { YouTubePlayer } from 'react-youtube';

interface props {
    url: string;
}

const YTplayer: React.FC<props> = ({ url }) => {

    const [timestamps, setTimestamps] = useState<string[]>([])

    const opts = {
        height: '390',
        width: '640'
    };

    const handlePause = (e: YouTubePlayer) => {
        const current = e.target.getCurrentTime();
        setTimestamps(prev => [...prev, current]);
    }

    return (
        <div>
            <YouTube videoId={url} opts={opts} onPause={handlePause} />
            <ul>
                {timestamps.map(t => {
                    return <li>{t}</li>
                })}
            </ul>
        </div>
    )
}

export default YTplayer