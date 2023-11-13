import React from 'react'
import { useAppSelector } from '../hooks'
import { showAllActionHistory } from '../slice/actionHistory';
import { accessCurrentVideoElement } from '../slice/youTubePlayer';

const ActionHistory: React.FC = () => {

    const getAllActionHistory = useAppSelector(showAllActionHistory);
    const getCurrentVideoElement = useAppSelector(accessCurrentVideoElement);

    const handleResume = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetTimestamp = (e.target as HTMLButtonElement).getAttribute('data-value');
        getCurrentVideoElement.target.seekTo(targetTimestamp);
    }
    return (
        <div>
            <ul>
                {getAllActionHistory.map(({ playerName, actionType, videoTimeStamp }) => {
                    return <li onClick={handleResume} data-value={videoTimeStamp}>{playerName} {actionType} - {videoTimeStamp}</li>
                })}
            </ul>
        </div>
    )
}

export default ActionHistory