import React from 'react'
import { accessCurrentVideoElement } from '../slices/videoSlice';
import { shot } from '../slices/gameSlice'
import { useAppDispatch, useAppSelector } from '../hooks';

interface props {
    home: boolean;
    id: string;
}

const ButtonList: React.FC<props> = ({ home, id }) => {
    const dispatch = useAppDispatch();
    const getCurrentVideoElement = useAppSelector(accessCurrentVideoElement);

    const buttonList: string[] = ['Made 2', 'Missed 2', 'Made 3', 'Missed 3'];

    const handleClick = (action: string, id: string) => {

        switch (action) {
            case 'Made 2':
                dispatch(shot({ home, id, type: 'made', point: 'twoPoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime() }))
                break;
            case 'Missed 2':
                dispatch(shot({ home, id, type: 'missed', point: 'twoPoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime() }))
                break;
            case 'Made 3':
                dispatch(shot({ home, id, type: 'made', point: 'threePoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime() }))
                break;
            case 'Missed 3':
                dispatch(shot({ home, id, type: 'missed', point: 'threePoint', videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime() }))
                break;
        }
    }

    return (
        <div>
            {buttonList.map((action) => {
                return <button onClick={() => handleClick(action, id)}>{action}</button>
            })}
        </div>
    )
}

export default ButtonList