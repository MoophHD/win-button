import { ON_SOLVE, NEXT_LVL, CLEAR } from '../constants/game.constants';

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

export function clear() {
    return {
        type: CLEAR
    }
}

