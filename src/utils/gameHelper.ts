import { PlayerState } from "../slices/gameSlice";

export const calculateTeamScore = (players: PlayerState[]) => {
    let score: number = 0;
    for (let i = 0; i < players.length; i++) {
        score = score + players[i].made.onePoint * 1 + players[i].made.twoPoint * 2 + players[i].made.threePoint * 3;
    }
    return score;
}