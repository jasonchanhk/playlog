import React from 'react'
import { useAppSelector } from '../hooks'
import { showAllActionHistory } from '../slices/actionHistory';
import { accessCurrentVideoElement } from '../slices/videoSlice';

import { FaPlayCircle, FaPen } from "react-icons/fa";
import { IconContext } from 'react-icons';

const ActionHistory: React.FC = () => {

    const getAllActionHistory = useAppSelector(showAllActionHistory);
    const getCurrentVideoElement = useAppSelector(accessCurrentVideoElement);

    const handleResume = (e: React.MouseEvent, videoElapsedTimeStamp: string) => {
        e.preventDefault();
        console.log(videoElapsedTimeStamp)
        getCurrentVideoElement.target.seekTo(videoElapsedTimeStamp);
    }
    return (
        <section className='mx-3'>
            <h3 className='font-bold py-3 px-12 bg-black text-white flex justify-center'>Action History</h3>
            <div className='flex flex-col gap-y-2 py-2'>
                {getAllActionHistory.map(({ playerName, actionType, videoElapsedTimeStamp, videoFormattedTimeStamp }) => {
                    return (
                        <div className='border border-black shadow-md text-sm'>
                            <div className='border-b border-black flex justify-between px-2'>
                                <span>
                                    Q1 {videoFormattedTimeStamp} 0-0
                                </span>
                                <span className='flex flex-row gap-x-2'>
                                    <button>
                                        <FaPen />
                                    </button>
                                    <button onClick={e => handleResume(e, videoElapsedTimeStamp)} value={videoElapsedTimeStamp}>
                                            <FaPlayCircle />
                                    </button>
                                </span>

                            </div>
                            <div className='flex flex-col px-2 py-1'>
                                <h3>{actionType}</h3>
                                <div className='flex flex-row items-center'>
                                    <div className='flex justify-center w-16 h-4 bg-black text-white tracking-tighter leading- font-semibold text-xs items-center'>
                                        2PA
                                    </div>
                                    <div className='ml-2'>
                                        <span className='w-6 inline-block'>23.</span>
                                        <span className='pl-1'>{playerName}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ActionHistory