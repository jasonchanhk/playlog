import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import Droppable from '../templates/Droppable';
import Draggable from '../templates/Draggable';

interface player {
  playerName: string;
  score: number;
  attempt: number;
}

const Controlpanel = () => {

  const [playerList, setPlayerList] = useState<player[]>([
    { playerName: 'Sean', score: 0, attempt: 0 },
    { playerName: 'MM', score: 0, attempt: 0 },
    { playerName: 'Michael', score: 0, attempt: 0 },
    { playerName: 'Samuel', score: 0, attempt: 0 },
    { playerName: 'Gabriel', score: 0, attempt: 0 }
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over) {
      setPlayerList(prevPlayerList => {
        return prevPlayerList.map(player => {
          if (player.playerName === event.over?.id) {
            if (event.active?.id === '2PointMade') {
              return { ...player, score: player.score + 2, attempt: player.attempt + 1 };
            } else if (event.active?.id === '2PointMiss') {
              return { ...player, attempt: player.attempt + 1 };
            }
          }
          return player;
        })
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Draggable type={'2PointMade'}>2 point made</Draggable>
      <Draggable type={'2PointMiss'}>2 point miss</Draggable>
      {
        playerList.map(({ playerName, score, attempt }) => {
          return <Droppable playerId={playerName}>{playerName} - Score:{score} - Attempt:{attempt}</Droppable>
        })
      }
    </DndContext>
  );
}

export default Controlpanel