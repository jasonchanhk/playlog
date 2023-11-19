import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Droppable from '../templates/Droppable';
import Draggable from '../templates/Draggable';
import ButtonList from './ButtonList';

import { FaListUl } from "react-icons/fa";
import { IconContext } from "react-icons"

import { useAppSelector } from '../hooks';
import { showAllPlayerAction } from '../slices/playerAction'

export interface player {
  playerName: string;
  twoPointAttempt: number;
  twoPointMade: number;
}

const PlayerList: React.FC = () => {

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

    <div className=''>
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
      <ul role="list" className="divide-y divide-gray-100p px-4">
        {
          getAllPlayer.map(({ playerName, twoPointMade, twoPointMiss }) => {
            return (
              <li className='flex justify-between gap-x-6 py-1'>
                <div className="flex min-w-0 gap-x-4">
                  <div className="flex items-center justify-center">
                    <span className=" font-bold text-3xl tracking-tighter italic leading-tight">
                      23
                    </span>
                  </div>
                  <div className="min-w-0 flex-auto">
                    <div className="text-sm font-semibold leading-tight text-gray-900">{playerName}</div>
                    <div className="text-xs text-gray-500 w-full flex leading-tight">
                      <span className='w-10'>{twoPointMade * 2} pts</span>
                      <span className='w-10'>0 reb</span>
                      <span className='w-10'>0 ast</span>
                    </div>
                  </div>
                </div>
                <div className='has-tooltip'>
                  <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8'>
                    <ButtonList playerName={playerName} />
                  </span>
                  <IconContext.Provider value={{ className: "h-full flex item-center text-lg"}}><FaListUl /></IconContext.Provider>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default PlayerList