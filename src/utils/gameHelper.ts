import { PlayerState } from "../slices/playerSlice";

export const calculateTeamScore = (players: PlayerState[]) => {
    let score: number = 0;
    for (let i = 0; i < players.length; i++) {
        score = score + players[i].made.onePoint * 1 + players[i].made.twoPoint * 2 + players[i].made.threePoint * 3;
    }
    return score;
}

export const pointTranslater = (digit: number, point: string) => {
    switch (digit) {
        case 1:
            switch (point) {
                case 'onePoint':
                    return '1'
                    break;
                case 'twoPoint':
                    return '2'
                    break;
                case 'threePoint':
                    return '3'
                    break;
                default:
                    return '';
            }
        case 2:
            switch (point) {
                case 'onePoint':
                    return 'FT'
                    break;
                case 'twoPoint':
                    return '2P'
                    break;
                case 'threePoint':
                    return '3P'
                    break;
                default:
                    return '';
            }
        default:
            return '';
    }

}

export const shotResultTranslater = (actionType: string) => {
    switch (actionType) {
        case 'made':
            return 'M'
            break;
        case 'missed':
            return 'A'
            break;
        default:
            return '';
    }
}

export const shotShortTermFormatter = (actionType: string, point: string) => {
    const pointSF = pointTranslater(2, point);
    const shotResultSF = shotResultTranslater(actionType);
    const shortTerm = pointSF + shotResultSF;
    return shortTerm;
}

