import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import Droppable from '../templates/Droppable';
import Draggable from '../templates/Draggable';
import ButtonList from './ButtonList';

import { useAppSelector } from '../hooks';
import { showAllPlayerAction } from '../slice/playerAction'

export interface player {
  playerName: string;
  twoPointAttempt: number;
  twoPointMade: number;
}

const Controlpanel: React.FC = () => {

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
    <div>
      <h3>Player List</h3>
      {/* {
        playerList.map(({ playerName, twoPointMade, twoPointAttempt }) => {
          return (
            <div className='has-tooltip'>
              <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8'>
                <ButtonList setPlayerList={setPlayerList} playerName={playerName}/>
              </span>
              <div>{playerName} - {twoPointMade*2}pt : {twoPointAttempt}</div>
            </div>
          )
        })
      } */}
      {
        getAllPlayer.map(({ playerName, twoPointMade, twoPointMiss }) => {
          return (
            <div className='has-tooltip'>
              <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8'>
                <ButtonList playerName={playerName}/>
              </span>
              <div>{playerName} - {twoPointMade*2}pt : {twoPointMiss}</div>
            </div>
          )
        })
      }
    </div>
  );
}

export default Controlpanel