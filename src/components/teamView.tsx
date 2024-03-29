import React from 'react'
import { showBothTeam } from '../slices/gameSlice'
import { useAppSelector } from '../hooks';
import { calculateTeamScore } from '../utils/gameHelper'
import CountdownTimer from './coundown';

const TeamView: React.FC = () => {

    const getBothTeam = useAppSelector(showBothTeam);

    return (
        <div className='flex justify-between my-2'>

            <div className='w-2 bg-red-600'></div>
            <div className='flex justify-between border-gray-200 border w-full border-s-0'>
                <div className='p-2'>
                    <h3 className='leading-none tracking-tight text-sm'>Home</h3>
                    <h1 className='font-bold text-3xl leading-none tracking-tight'>{getBothTeam.home.name}</h1>
                </div>
                <div className='text-4xl flex items-center font-bold border-s border-gray-200 w-24'>
                    <div className='w-full text-center'>{getBothTeam.home.score}</div>
                </div>
            </div>
            <div className='mx-1'>
                <CountdownTimer/>
            </div>
            <div className='flex justify-between border-gray-200 border w-full border-e-0'>
                <div className='text-4xl flex items-center font-bold border-e border-gray-200 w-24 '>
                    <div className='w-full text-center'>{getBothTeam.away.score}</div>
                </div>
                <div className='text-right p-2'>
                    <h3 className='leading-none tracking-tight text-sm'>Away</h3>
                    <h1 className='font-bold text-3xl leading-none tracking-tight'>{getBothTeam.away.name}</h1>
                </div>
            </div>
            <div className='w-2 bg-yellow-400'></div>

        </div>
    )
}

export default TeamView