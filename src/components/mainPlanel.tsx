import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import Droppable from '../templates/Droppable';
import Draggable from '../templates/Draggable';
import ButtonList from './ButtonList';

import { useAppSelector } from '../hooks';
import { showAllPlayerAction } from '../slices/playerAction'
import VideoPlayer from './videoPlayer';
import ActionHistory from './actionHistory';
import PlayerList from './playerList';

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
        <section  className='my-16 py-8'>
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                2. Run statistic in your video
            </h2>
            <div className='flex'>
                <div className='flex-1'>
                    <div className='flex'>
                        <VideoPlayer />
                    </div>
                    <div className="md:grid md:grid-cols-3 md:gap-x-16 lg:gap-x-4 max-h-full">
                        <PlayerList />
                        <div>Home v.s. Away</div>
                        <PlayerList />
                    </div>
                </div>
                <div className='flex-initial w-72 bg-slate-200'>
                    <ActionHistory />
                </div>
            </div>
        </section>
    );
}

export default MainPanel