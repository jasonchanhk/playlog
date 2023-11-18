import React from 'react'
import { useAppSelector } from '../hooks'
import { showAllActionHistory } from '../slices/actionHistory';
import { accessCurrentVideoElement } from '../slices/videoSlice';
import Container from './container';

const ActionHistory: React.FC = () => {

    const getAllActionHistory = useAppSelector(showAllActionHistory);
    const getCurrentVideoElement = useAppSelector(accessCurrentVideoElement);

    const handleResume = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetTimestamp = (e.target as HTMLButtonElement).getAttribute('data-value');
        getCurrentVideoElement.target.seekTo(targetTimestamp);
    }
    return (
        <section>
            <span>Action History</span>
            <ul>
                {getAllActionHistory.map(({ playerName, actionType, videoElapsedTimeStamp, videoFormattedTimeStamp }) => {
                    return <li onClick={handleResume} data-value={videoElapsedTimeStamp}>{playerName} {actionType} - {videoFormattedTimeStamp}</li>
                })}
            </ul>
        </section>
    )
}

export default ActionHistory