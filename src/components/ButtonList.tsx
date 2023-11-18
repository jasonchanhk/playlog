import React from 'react'
import { addActionHistory } from '../slices/actionHistory';
import { accessCurrentVideoElement } from '../slices/videoSlice';
import { scoreTwoPoints, missTwoPoints } from '../slices/playerAction'
import { useAppDispatch, useAppSelector } from '../hooks';

interface props {
    playerName: string;
}

const ButtonList: React.FC<props> = ({ playerName }) => {
    const dispatch = useAppDispatch();
    const getCurrentVideoElement = useAppSelector(accessCurrentVideoElement);
    
    const buttonList: string[] = ['twoPointMade', 'twoPointMiss', 'threePointMade', 'threePointAttempt'];

    const addHistory = (name: string, action: string) => {
        dispatch(addActionHistory({
            playerName: name,
            actionType: action,
            videoElapsedTimeStamp: getCurrentVideoElement.target.getCurrentTime()
        }))
    }

    const handleClick = (action: string, playerName: string) => {
        addHistory(playerName, action);
        if (action === 'twoPointMade') {
            dispatch(scoreTwoPoints(playerName))
        } else if (action === 'twoPointMiss') {
            dispatch(missTwoPoints(playerName))
        }
    }

    return (
        <div>
            {buttonList.map((name) => {
                return <button onClick={() => handleClick(name, playerName)}>{name}</button>
            })}
        </div>
    )
}

export default ButtonList