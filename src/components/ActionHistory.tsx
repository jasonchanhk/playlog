import React from 'react'
import { useAppSelector } from '../hooks'
import { showAllActionHistory } from '../slices/actionHistory';
import { accessCurrentVideoElement } from '../slices/videoSlice';

import { FaPlayCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';

const ActionHistory: React.FC = () => {

    const getAllActionHistory = useAppSelector(showAllActionHistory);
    const getCurrentVideoElement = useAppSelector(accessCurrentVideoElement);

    const handleResume = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetTimestamp = (e.target as HTMLButtonElement).getAttribute('data-value');
        getCurrentVideoElement.target.seekTo(targetTimestamp);
    }
    return (
        <section className='mx-3'>
            <h3 className='font-bold py-3 px-12 bg-black text-white flex justify-center'>Action History</h3>
            <div className='flex flex-col gap-y-2 py-2'>
                {getAllActionHistory.map(({ playerName, actionType, videoElapsedTimeStamp, videoFormattedTimeStamp }) => {
                    return (
                        <div className='border border-black shadow-md'>
                            <div className='border-b border-black flex justify-between'>
                                <span>
                                    Q1 09:56 0-0
                                </span>
                                <button onClick={handleResume} data-value={videoElapsedTimeStamp}>
                                    <IconContext.Provider value={{ className: "" }}>
                                        <FaPlayCircle />
                                    </IconContext.Provider>
                                </button>
                            </div>
                            {playerName} {actionType} - {videoFormattedTimeStamp}

                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ActionHistory