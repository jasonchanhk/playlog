import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import Droppable from '../templates/Droppable';
import Draggable from '../templates/Draggable';
import ButtonList from './ButtonList';

import { useAppSelector } from '../hooks';
import { showAllPlayerAction } from '../slices/playerAction'
import VideoPlayer from './videoPlayer';

export interface player {
    playerName: string;
    twoPointAttempt: number;
    twoPointMade: number;
}

const MainPanel: React.FC = () => {

    const getAllPlayer = useAppSelector(showAllPlayerAction);
    // const handleDragEnd = (event: DragEndEvent) => {
    //   if (event.over) {
    //     setPlayerList(prevPlayerList => {
    //       return prevPlayerList.map(player => {
    //         if (player.playerName === event.over?.id) {
    //           if (event.active?.id === '2PointMade') {
    //             return { ...player, score: player.score + 2, attempt: player.attempt + 1 };
    //           } else if (event.active?.id === '2PointMiss') {
    //             return { ...player, attempt: player.attempt + 1 };
    //           }
    //         }
    //         return player;
    //       })
    //     });
    //   }
    // }



    return (
        // <DndContext onDragEnd={handleDragEnd}>
        //   <Draggable type={'2PointMade'}>2 point made</Draggable>
        //   <Draggable type={'2PointMiss'}>2 point miss</Draggable>
        //   {
        //     playerList.map(({ playerName, score, attempt }) => {
        //       return <Droppable playerId={playerName}>{playerName} - Score:{score} - Attempt:{attempt}</Droppable>
        //     })
        //   }
        // </DndContext>
        <section>
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                More Stories
            </h2>
            <div className="md:grid md:grid-cols-3 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28 max-h-full">
                <div className='col-span-2'>
                    <VideoPlayer/>
                </div>
                <div className='bg-green-200'>
                    <ul role="list" className="divide-y divide-gray-100p p-4">
                        {
                            getAllPlayer.map(({ playerName, twoPointMade, twoPointMiss }) => {
                                return (
                                    <li className='flex justify-between gap-x-6 py-2'>
                                        <div className="flex min-w-0 gap-x-4">
                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{playerName}</p>
                                                <p className="mt-0.5 truncate text-xs leading-5 text-gray-500">{twoPointMade * 2}pt</p>
                                            </div>
                                        </div>
                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <div className='has-tooltip'>
                                                <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8'>
                                                    <ButtonList playerName={playerName} />
                                                </span>
                                                <div>icon</div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul role="list" className="divide-y divide-gray-100p p-4">
                        {
                            getAllPlayer.map(({ playerName, twoPointMade, twoPointMiss }) => {
                                return (
                                    <li className='flex justify-between gap-x-6 py-2'>
                                        <div className="flex min-w-0 gap-x-4">
                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{playerName}</p>
                                                <p className="mt-0.5 truncate text-xs leading-5 text-gray-500">{twoPointMade * 2}pt</p>
                                            </div>
                                        </div>
                                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                            <div className='has-tooltip'>
                                                <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8'>
                                                    <ButtonList playerName={playerName} />
                                                </span>
                                                <div>icon</div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>

                </div>
                <div>
                    {
                        getAllPlayer.map(({ playerName, twoPointMade, twoPointMiss }) => {
                            return (
                                <div className='has-tooltip'>
                                    <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8'>
                                        <ButtonList playerName={playerName} />
                                    </span>
                                    <div>{playerName} - {twoPointMade * 2}pt : {twoPointMiss}</div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </section>
    );
}

export default MainPanel