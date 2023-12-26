import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { calculateTeamScore, shotShortTermFormatter, pointTranslater } from '../utils/gameHelper'
import { formatElapsedTime } from '../utils/datetimeHelper'
import { save } from './modalSlice';

// Define a type for the slice state
export type shotScoreOption = {
    onePoint: number;
    twoPoint: number;
    threePoint: number;
}

export interface PlayerState {
    id: string;
    jersey: string;
    name: string;
    made: shotScoreOption;
    missed: shotScoreOption;
    rebound?: {
        offensive: number;
        defensive: number;
    }
    assist?: number;
    steal?: number;
    turnover?: number;
    foul: number
}

export interface TeamState {
    id: string;
    score: number;
    name: string;
    colour: string;
    players: PlayerState[];
}

export interface HistoryState {
    team: string;
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
    actionPlayer: PlayerState
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
        score: 0,
        players: [
            { id: 'Sean', name: 'Sean', jersey: '6', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
            { id: 'MM', name: 'MM', jersey: '9', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
            { id: 'Michael', name: 'Michael', jersey: '2', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
            { id: 'Samuel', name: 'Samuel', jersey: '7', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
            { id: 'Gabriel', name: 'Gabriel', jersey: '21', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 }
        ]
    },
    away: {
        id: 'Sutton',
        name: 'Sutton',
        colour: 'yellow-400',
        score: 0,
        players: [
            { id: 'Pong', name: 'Pong', jersey: '67', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
            { id: 'Sing', name: 'Sing', jersey: '18', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
            { id: 'Nick', name: 'Nick', jersey: '2', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
            { id: 'Leo', name: 'Leo', jersey: '38', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
            { id: 'Bernad', name: 'Bernad', jersey: '13', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 }
        ]
    },
    history: []
};

export const GameSlice = createSlice({
    name: 'action',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        made: (state, action) => {
            //mark personal profile
            let point: 'onePoint' | 'twoPoint' | 'threePoint' = action.payload.point;
            let team: 'home' | 'away' = action.payload.home ? 'home' : 'away';
            let playerId: string = action.payload.id
            let objIndex: number = state[team].players.findIndex((player => player.id == playerId));
            state[team].players[objIndex].made[point] = state[team].players[objIndex].made[point] + 1;
            state.home.score = calculateTeamScore(state.home.players)
            state.away.score = calculateTeamScore(state.away.players)
        },
        missed: (state, action) => {
            //mark personal profile
            let point: 'onePoint' | 'twoPoint' | 'threePoint' = action.payload.point;
            let team: 'home' | 'away' = action.payload.home ? 'home' : 'away';
            let playerId: string = action.payload.id
            let objIndex: number = state[team].players.findIndex((player => player.id == playerId));
            state[team].players[objIndex].missed[point] = state[team].players[objIndex].missed[point] + 1;
            state.home.score = calculateTeamScore(state.home.players)
            state.away.score = calculateTeamScore(state.away.players)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(save, (state, action) => {

            const { timeLeft, actionType, point, playerId, home, assist, rebound, foul, shotType, videoElapsedTimeStamp } = action.payload;
            let team: 'home' | 'away' = home? 'home' : 'away';
            const shortRecords: shortRecord[] = [];

            if (point != null && actionType != null) {
                let objIndex: number = state[team].players.findIndex((player => player.id == playerId));
                let shotPlayer: PlayerState = state[team].players[objIndex];
                let shotRecord: shortRecord = {
                    actionShortTerm: shotShortTermFormatter(actionType, point),
                    actionPlayer: shotPlayer
                }
                shortRecords.push(shotRecord)
            }
            if(rebound != 'skip'){
                let reboundPlayer: PlayerState;

                let objIndex: number = state.home.players.findIndex((player => player.id == rebound));
                if (objIndex < 0){
                    objIndex = state.away.players.findIndex((player => player.id == rebound));
                    reboundPlayer = state.away.players[objIndex]
                }else{
                    reboundPlayer = state.home.players[objIndex]
                }
                let reboundRecord: shortRecord  = {
                    actionShortTerm: 'REB',
                    actionPlayer: reboundPlayer
                }
                shortRecords.push(reboundRecord)
            }
            if(assist != 'skip'){
                let objIndex: number = state[team].players.findIndex((player => player.id == assist));
                let assistPlayer: PlayerState = state[team].players[objIndex]
                let assistRecord: shortRecord = {
                    actionShortTerm: 'AST',
                    actionPlayer: assistPlayer
                }
                shortRecords.push(assistRecord)
            }

            state.history.unshift({
                team: team,
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
        //     // reduce the collection by the id property into a shape of { 1: { ...user }}
        //     const byId = action.payload.users.reduce((byId, user) => {
        //         byId[user.id] = user
        //         return byId
        //     }, {})
        //     state.entities = byId
        //     state.ids = Object.keys(byId)

        // state.history.unshift({
        //     name: state[team].players[objIndex].name,
        //     jersey: state[team].players[objIndex].jersey,
        //     team: team,
        //     actionType: `shot ${type}`,
        //     videoElapsedTimeStamp: action.payload.videoElapsedTimeStamp,
        //     videoFormattedTimeStamp: formatElapsedTime(action.payload.videoElapsedTimeStamp),
        //     timeLeft: action.payload.timeLeft,
        //     score: {
        //         home: state.home.score,
        //         away: state.away.score
        //     }
        // });
        //     })
    }
})

export const { made, missed } = GameSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const countActionHistory = (state: RootState) => state.actionHistory.length
export const showHomeTeam = (state: RootState) => state.game.home;
export const showAwayTeam = (state: RootState) => state.game.away;
export const showBothTeam = (state: RootState) => state.game;
export const showLiveScore = (state: RootState) => ({ home: state.game.home.score, away: state.game.away.score });
export const showAllHistory = (state: RootState) => state.game.history;
export const showAllHistoryCount = (state: RootState) => state.game.history.length;
// game score
// game quarter & time

export default GameSlice.reducer