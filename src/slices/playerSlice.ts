import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { calculateTeamScore, shotShortTermFormatter, pointTranslater } from '../utils/gameHelper'
import { save } from './modalSlice';
// Define a type for the slice state
export type shotScoreOption = {
    onePoint: number;
    twoPoint: number;
    threePoint: number;
}

export interface PlayerState {
    home: boolean;
    id: string;
    onFloor: boolean;
    teamId: string;
    jersey: string;
    name: string;
    made: shotScoreOption;
    missed: shotScoreOption;
    rebound: {
        offensive: number;
        defensive: number;
    }
    assist: number;
    steal?: number;
    turnover?: number;
    foul: number
}


export interface AllPlayerState {
    gameId: string;
    players: PlayerState[];
}

const initialState: AllPlayerState = {
    gameId: 'gameId',
    players: [
        { home: true, teamId: 'westman', onFloor: false, id: 'Sean', name: 'Sean', jersey: '6', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
        { home: true, teamId: 'westman', onFloor: false, id: 'MM', name: 'MM', jersey: '9', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
        { home: true, teamId: 'westman', onFloor: false, id: 'Michael', name: 'Michael', jersey: '2', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
        { home: true, teamId: 'westman', onFloor: false, id: 'Samuel', name: 'Samuel', jersey: '7', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
        { home: true, teamId: 'westman', onFloor: false, id: 'Gabriel', name: 'Gabriel', jersey: '21', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
        { home: false, teamId: 'sutton', onFloor: false, id: 'Pong', name: 'Pong', jersey: '67', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
        { home: false, teamId: 'sutton', onFloor: false, id: 'Sing', name: 'Sing', jersey: '18', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
        { home: false, teamId: 'sutton', onFloor: false, id: 'Nick', name: 'Nick', jersey: '2', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
        { home: false, teamId: 'sutton', onFloor: false, id: 'Leo', name: 'Leo', jersey: '38', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 },
        { home: false, teamId: 'sutton', onFloor: false, id: 'Bernad', name: 'Bernad', jersey: '13', made: { onePoint: 0, twoPoint: 0, threePoint: 0 }, missed: { onePoint: 0, twoPoint: 0, threePoint: 0 }, rebound: { offensive: 0, defensive: 0 }, assist: 0, steal: 0, turnover: 0, foul: 0 }
    ],
};

export const PlayerSlice = createSlice({
    name: 'Player',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        made: (state, action) => {
            //mark personal profile
            let point: 'onePoint' | 'twoPoint' | 'threePoint' = action.payload.point;
            let playerId: string = action.payload.id
            let playerIndex: number = state.players.findIndex((player => player.id == playerId));
            if (playerIndex !== -1) {
                state.players[playerIndex].made[point]++;
            }
        },
        missed: (state, action) => {
            //mark personal profile
            let point: 'onePoint' | 'twoPoint' | 'threePoint' = action.payload.point;
            let playerId: string = action.payload.id
            let playerIndex: number = state.players.findIndex((player => player.id == playerId));
            if (playerIndex !== -1) {
                state.players[playerIndex].missed[point]++;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(save, (state, action) => {

            const { playerId, assist, rebound } = action.payload;

            if(rebound != 'skip'){
                let playerIndex: number = state.players.findIndex((player => player.id == rebound));
                let rebounder: PlayerState | undefined = state.players.find((player => player.id == rebound));
                let shotTaker: PlayerState | undefined = state.players.find((player => player.id == playerId));

                if (playerIndex !== -1) {
                    if(rebounder!.teamId != shotTaker!.teamId){
                        state.players[playerIndex].rebound.offensive++;
                    }else{
                        state.players[playerIndex].rebound.defensive++;
                    }
                }
            }
            if(assist != 'skip'){
                let playerIndex: number = state.players.findIndex((player => player.id == assist));
                if (playerIndex !== -1) {
                    state.players[playerIndex].assist++;
                }
            }
        })
    }
})


export const { made, missed } = PlayerSlice.actions

export const showHomePlayer = (state: RootState) => state.player.players.filter((player) => player.home == true);
export const showAwayPlayer = (state: RootState) => state.player.players.filter((player) => player.home == false);
export const showAllPlayer = (state: RootState) => state.player.players;

export default PlayerSlice.reducer