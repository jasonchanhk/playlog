import React from 'react';
import {useDroppable, UniqueIdentifier} from '@dnd-kit/core';

interface props {
    children: React.ReactNode;
    playerId: UniqueIdentifier;
}

const Droppable: React.FC<props> = ({ children, playerId }) => {
  const {isOver, setNodeRef} = useDroppable({
    id: playerId,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default Droppable;