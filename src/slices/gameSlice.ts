import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { calculateTeamScore, shotShortTermFormatter, pointTranslater } from '../utils/gameHelper'
import { formatElapsedTime } from '../utils/datetimeHelper'
import { save } from './modalSlice';
import { made, PlayerState } from './playerSlice';

export interface TeamState {
    id: string;
    score: number;
    name: string;
    colour: string;
}

export interface HistoryState {
    actionType: string;
    videoElapsedTimeStamp: string;
    videoFormattedTimeStamp: string;
    timeLeft: number;
    score: {
        home: number;
        away: number;
    };
    shortRecords: shortRecord[]
}

export type shortRecord = {
    actionShortTerm: string;
    actionPlayer: string;
}

export interface GameState {
    id: string;
    home: TeamState;
    away: TeamState;
    history: HistoryState[]
}

// Define the initial state using that type
const initialState: GameState = {
    id: 'game',
    home: {
        id: 'Westman',
        name: 'Westman',
        colour: 'red-600',
        score: 0
    },
    away: {
        id: 'Sutton',
        name: 'Sutton',
        colour: 'yellow-400',
        score: 0
    },
    history: []
};

export const GameSlice = createSlice({
    name: 'action',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(save, (state, action) => {

            const { timeLeft, actionType, point, playerId, home, assist, rebound, foul, shotType, videoElapsedTimeStamp } = action.payload;
            const shortRecords: shortRecord[] = [];

            if (point != null && actionType != null) {
                let shotRecord: shortRecord = {
                    actionShortTerm: shotShortTermFormatter(actionType, point),
                    actionPlayer: playerId
                }
                shortRecords.push(shotRecord)
            }
            if(rebound != 'skip'){
                let reboundRecord: shortRecord  = {
                    actionShortTerm: 'REB',
                    actionPlayer: rebound
                }
                shortRecords.push(reboundRecord)
            }
            if(assist != 'skip'){
                let assistRecord: shortRecord = {
                    actionShortTerm: 'AST',
                    actionPlayer: assist
                }
                shortRecords.push(assistRecord)
            }

            state.history.unshift({
                actionType: `shot ${actionType}`,
                videoElapsedTimeStamp: videoElapsedTimeStamp,
                videoFormattedTimeStamp: formatElapsedTime(videoElapsedTimeStamp),
                timeLeft: timeLeft,
                score: {
                    home: state.home.score,
                    away: state.away.score
                },
                shortRecords: shortRecords
            });
        })

        builder.addCase(made, (state, action) => {
            let point: number = parseInt(pointTranslater(1, action.payload.point));
            let team: 'home' | 'away' = action.payload.home ? 'home' : 'away';
            state[team].score = state[team].score + point
        })
    }
})

// Other code such as selectors can use the imported `RootState` type
// export const countActionHistory = (state: RootState) => state.actionHistory.length
export const showBothTeam = (state: RootState) => state.game;
export const showLiveScore = (state: RootState) => ({ home: state.game.home.score, away: state.game.away.score });
export const showAllHistory = (state: RootState) => state.game.history;
export const showAllHistoryCount = (state: RootState) => state.game.history.length;
// game score
// game quarter & time

export default GameSlice.reducer