import React from 'react';
import {UniqueIdentifier, useDraggable} from '@dnd-kit/core';

interface props {
    children: React.ReactNode;
    type: UniqueIdentifier;
}

const Draggable: React.FC<props> = ({ children, type }) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: type,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}

export default Draggable;