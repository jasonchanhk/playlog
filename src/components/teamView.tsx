import React from 'react'
import { showBothTeam, PlayerState } from '../slices/gameSlice'
import { useAppSelector } from '../hooks';
import { calculateTeamScore } from '../utils/gameHelper'

const TeamView: React.FC = () => {

    const getBothTeam = useAppSelector(showBothTeam);

    return (
        <div>
            <div>Home<br />{getBothTeam.home.score}</div>
            <div>Away<br />{getBothTeam.away.score}</div>
        </div>
    )
}

export default TeamView