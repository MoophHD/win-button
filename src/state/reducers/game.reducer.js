import { 
    ON_SOLVE
} from '../constants/game.constants';

const initialState = {
    current: 0,
    ids: [0],
    byid: {
        0: {
            solved: false
        }
    }
}

export default (state=initialState, action) => {
    switch(action.type) {
        case ON_SOLVE: {
            //save somewhere
            return {...state, byid: {...state.byid,
                [action.id]: { isSolved: true }
            }}
        }
        default: {
            return state;
        }
    }
}