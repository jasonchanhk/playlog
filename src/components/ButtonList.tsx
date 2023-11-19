import React from 'react'
import { addActionHistory } from '../slices/actionHistory';
import { accessCurrentVideoElement } from '../slices/videoSlice';
import { shot } from '../slices/playerSlice'
import { useAppDispatch, useAppSelector } from '../hooks';

interface props {
    name: string;
}

const ButtonList: React.FC<props> = ({ name }) => {
    const dispatch = useAppDispatch();
    const getCurrentVideoElement = useAppSelector(accessCurrentVideoElement);

    const buttonList: string[] = ['Made 2', 'Miss 2', 'Made 3', 'Miss 3'];

    const addHistory = (name: string, action: string) => {
        dispatch(addActionHistory({
            playerName: name,
            actionType: action,
            videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime()
        }))
    }

    const handleClick = (action: string, name: string) => {
        addHistory(name, action);
        switch (action) {
            case 'Made 2':
                dispatch(shot({ name, type: 'made', point: 'twoPoint' }))
                break;
            case 'Missed 2':
                dispatch(shot({ name, type: 'missed', point: 'twoPoint' }))
                break;
            case 'Made 3':
                dispatch(shot({ name, type: 'made', point: 'threePoint' }))
                break;
            case 'Missed 3':
                dispatch(shot({ name, type: 'missed', point: 'threePoint' }))
                break;
        }
    }

    return (
        <div>
            {buttonList.map((action) => {
                return <button onClick={() => handleClick(action, name)}>{action}</button>
            })}
        </div>
    )
}

export default ButtonList