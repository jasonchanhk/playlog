import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { calculateTeamScore } from '../utils/gameHelper'
import { formatElapsedTime } from '../utils/datetimeHelper'

// Define a type for the slice state
export interface PlayerState {
    id: string;
    jersey: string;
    name: string;
    made: {
        onePoint: number;
        twoPoint: number;
        threePoint: number;
    };
    missed: {
        onePoint: number;
        twoPoint: number;
        threePoint: number;
    };
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
    name: string;
    jersey:string;
    team: string;
    actionType: string;
    videoElapsedTimeStamp: string;
    videoFormattedTimeStamp: string;
    timeLeft: number;
    score: {
        home: number;
        away: number;
    }
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
        colour: 'bg-red-600',
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
        colour: 'bg-yellow-600',
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
        shot: (state, action) => {
            //mark personal profile
            let point: 'onePoint' | 'twoPoint' | 'threePoint' = action.payload.point;
            let type: 'made' | 'missed' = action.payload.type;
            let team: 'home' | 'away' = action.payload.home ? 'home' : 'away';
            let playerId: string = action.payload.id
            let objIndex: number = state[team].players.findIndex((player => player.id == playerId));
            state[team].players[objIndex][type][point] = state[team].players[objIndex][type][point] + 1;
            state.home.score = calculateTeamScore(state.home.players)
            state.away.score = calculateTeamScore(state.away.players)
            //create record history
            state.history.unshift({
                name: state[team].players[objIndex].name,
                jersey: state[team].players[objIndex].jersey,
                team: team,
                actionType: `shot ${type}`,
                videoElapsedTimeStamp: action.payload.videoElapsedTimeStamp,
                videoFormattedTimeStamp: formatElapsedTime(action.payload.videoElapsedTimeStamp),
                timeLeft: action.payload.timeLeft,
                score: {
                    home: state.home.score,
                    away: state.away.score
                }
            });
        },
    }
})

export const { shot } = GameSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const countActionHistory = (state: RootState) => state.actionHistory.length
export const showHomeTeam = (state: RootState) => state.game.home;
export const showAwayTeam = (state: RootState) => state.game.away;
export const showBothTeam = (state: RootState) => state.game;
export const showLiveScore = (state: RootState) => ({ home: state.game.home.score, away: state.game.away.score});
export const showAllHistory = (state: RootState) => state.game.history;
export const showAllHistoryCount = (state: RootState) => state.game.history.length;
// game score
// game quarter & time

export default GameSlice.reducer