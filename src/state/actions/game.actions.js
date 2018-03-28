import { ON_SOLVE } from '../constants/game.constants';

export function onSolve(id) {
    return {
        type: ON_SOLVE,
        id
    }
}