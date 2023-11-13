import React from 'react'
import { useAppSelector } from '../hooks'
import { showAllActionHistory } from '../slices/actionHistory';
import { accessCurrentVideoElement } from '../slices/videoSlice';

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
                {getAllActionHistory.map(({ playerName, actionType, videoElapsedTimeStamp, videoFormattedTimeStamp }) => {
                    return <li onClick={handleResume} data-value={videoElapsedTimeStamp}>{playerName} {actionType} - {videoFormattedTimeStamp}</li>
                })}
            </ul>
        </div>
    )
}

export default ActionHistory