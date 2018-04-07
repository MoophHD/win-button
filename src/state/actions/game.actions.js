import { ON_SOLVE, NEXT_LVL, CLEAR, SET_MUSIC, SET_SOUND } from '../constants/game.constants';

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

export function setMusic(isActive) {
    return {
        type: SET_MUSIC,
        isActive
    }
}


export function setSound(isActive) {
    return {
        type: SET_SOUND,
        isActive
    }
}