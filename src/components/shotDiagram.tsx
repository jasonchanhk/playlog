import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks';
import { showModalStatus, set } from '../slices/modalSlice'


const ShotDiagram: React.FC = () => {

  const dispatch = useAppDispatch();
  const modal = useAppSelector(showModalStatus);
  const clickCoordinate = modal.coordinate;

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const x = event.pageX - window.pageXOffset - boundingRect.left;
    const y = event.pageY - window.pageYOffset - boundingRect.top;
    dispatch(set({ category: 'coordinate', value: { x, y } }))
  };

  return (
    <div>
      <img
        src='./images/halfcourt.png'
        alt="basketball half court"
        onClick={handleImageClick}
        style={{ maxWidth: '100%' }} />
      {clickCoordinate.x !== null && clickCoordinate.y !== null &&
        <div
          style={{
            position: 'absolute',
            top: clickCoordinate.y,
            left: clickCoordinate.x,
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: 'red',
            transform: 'translate(100%, -50%)',
          }}
        />
      }
    </div>
  )
}

export default ShotDiagram