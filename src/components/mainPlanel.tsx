import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import Droppable from '../templates/Droppable';
import Draggable from '../templates/Draggable';
import ButtonList from './ButtonList';

import { useAppSelector } from '../hooks';
import { showHomePlayer, showAwayPlayer } from '../slices/playerSlice'
import VideoPlayer from './videoPlayer';
import ActionHistory from './actionHistory';
import PlayerList from './playerList';
import TeamView from './teamView';
import CountdownTimer from './coundown'
import Console from './console';

export interface player {
    playerName: string;
    twoPointAttempt: number;
    twoPointMade: number;
}

const MainPanel: React.FC = () => {

    const getHomePlayers = useAppSelector(showHomePlayer);
    const getAwayPlayers = useAppSelector(showAwayPlayer);

    return (
        <section className='my-16 py-8 h-auto'>
            <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                2. Log statistic in your video
            </h2>
            <div className='flex h-screen space-x-2'>
                <div className='flex-1'>
                    <div className=''>
                        <VideoPlayer />
                    </div>
                    <div className=''>
                        <TeamView />
                    </div>
                    <div className="md:grid md:grid-cols-3 md:gap-x-16 lg:gap-x-2 h-auto">
                        <PlayerList home={true} players={getHomePlayers} />
                        <Console />
                        <PlayerList home={false} players={getAwayPlayers} />
                    </div>
                </div>
                <div className='flex flex-col flex-initial w-72 h-full'>
                    <ActionHistory />
                </div>
            </div>
        </section>
    );
}

export default MainPanel