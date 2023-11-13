import React from 'react'
import { player } from './ControlPanel'
import { addActionHistory } from '../slice/actionHistory';
import { accessCurrentVideoElement } from '../slice/youTubePlayer';
import { scoreTwoPoints, missTwoPoints } from '../slice/playerAction'
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
            videoTimeStamp: getCurrentVideoElement.target.getCurrentTime()
        }))
    }

    const handleClick = (action: string, playerName: string) => {
        addHistory(playerName, action);
        if (action === 'twoPointMade') {
            dispatch(scoreTwoPoints(playerName))
        } else if (action === 'twoPointMiss') {
            dispatch(missTwoPoints(playerName))
        }
        // setPlayerList(prevPlayerList => {
        //     return prevPlayerList.map(player => {
        //         if (player.playerName === playerName) {
        //             if (action === 'twoPointMade') {
        //                 return { ...player, twoPointMade: player.twoPointMade + 1, twoPointAttempt: player.twoPointAttempt + 1 };
        //             } else if (action === 'twoPointAttempt') {
        //                 return { ...player, twoPointAttempt: player.twoPointAttempt + 1 };
        //             }
        //         }
        //         return player;
        //     })
        // })
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