import { ON_SOLVE, NEXT_LVL } from '../constants/game.constants';

export function onSolve(id) {
    return {
        type: ON_SOLVE,
        id
    }
}

export function nextLvl() {
    return {
        type: NEXT_LVL
    }
}