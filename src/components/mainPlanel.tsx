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
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                    <VideoPlayer/>
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
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                    <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
                        Long title here
                    </h3>
                    <div className="mb-4 md:mb-0 text-lg">
                        we will need a date
                    </div>
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