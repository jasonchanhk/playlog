import React from 'react'
import { useAppSelector } from '../hooks'
import { showAllHistory } from '../slices/gameSlice';
import { accessCurrentVideoElement } from '../slices/videoSlice';
import { showAllPlayer } from '../slices/playerSlice';

import { FaPlayCircle, FaPen } from "react-icons/fa";
import { IconContext } from 'react-icons';

const ActionHistory: React.FC = () => {

    const getAllHistory = useAppSelector(showAllHistory);
    const getCurrentVideoElement = useAppSelector(accessCurrentVideoElement);
    const getAllPlayer = useAppSelector(showAllPlayer);

    const handleResume = (e: React.MouseEvent, videoElapsedTimeStamp: string) => {
        e.preventDefault();
        console.log(videoElapsedTimeStamp)
        getCurrentVideoElement.target.seekTo(videoElapsedTimeStamp);
    }
    return (
        <section className='w-full flex flex-col overflow-hidden'>
            <h3 className='font-bold py-3 px-12 bg-black text-white flex justify-center'>Action History</h3>
            <div className='flex flex-col gap-y-2 py-2 overflow-y-auto min-h-0'>
                {getAllHistory.map(({ actionType, videoElapsedTimeStamp, score, timeLeft, shortRecords }) => {
                    const minutes = Math.floor(timeLeft / 60);
                    const seconds = timeLeft % 60;
                    return (
                        <div className='border border-black shadow-md text-sm'>
                            <div className='border-b border-black flex justify-between px-2'>
                                <span>
                                    Q1 {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} {score.home}-{score.away}
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
                                <h3 className='font-medium'>{actionType.toUpperCase()}</h3>
                                {shortRecords.map(({ actionShortTerm, actionPlayer }) => {
                                    const player = getAllPlayer.find((player) => player.id == actionPlayer)
                                    return (
                                        <div className='flex flex-row items-center'>
                                            <div className='flex justify-center w-16 h-4 bg-black text-white tracking-tighter leading- font-semibold text-xs items-center'>
                                                {actionShortTerm}
                                            </div>
                                            <div className='ml-2'>
                                                <span className='w-6 inline-block text-right'>{player!.jersey}.</span>
                                                <span className='pl-1'>{player!.name}</span>
                                            </div>
                                        </div>)
                                })}
                            </div>



                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ActionHistory