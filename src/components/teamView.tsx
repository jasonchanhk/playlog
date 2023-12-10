import React from 'react'
import { showBothTeam, PlayerState } from '../slices/gameSlice'
import { useAppSelector } from '../hooks';
import { calculateTeamScore } from '../utils/gameHelper'

const TeamView: React.FC = () => {

    const getBothTeam = useAppSelector(showBothTeam);

    return (
        <div className='flex justify-between my-2'>
            <div className='flex justify-between w-full p-2 border-s-8 border-red-600'>
                <div className=''>
                    <h3 className='leading-none tracking-tight'>Home</h3>
                    <h1 className='font-bold text-4xl leading-none tracking-tight'>{getBothTeam.home.name}</h1>
                </div>
                <div className='text-4xl flex items-center font-bold'>{getBothTeam.home.score}</div>
            </div>
            <div className='flex flex-col items-center font-bold align-middle'>
                <div>timeout</div>
                <div>jumpball</div>
            </div>
            <div className='flex justify-between w-full p-2 border-e-8 border-yellow-400'>
                <div className='text-4xl flex items-center font-bold'>{getBothTeam.away.score}</div>
                <div className='text-right'>
                    <h3 className='leading-none tracking-tight'>Away</h3>
                    <h1 className='font-bold text-4xl leading-none tracking-tight'>{getBothTeam.away.name}</h1>
                </div>
            </div>
        </div>
    )
}

export default TeamView