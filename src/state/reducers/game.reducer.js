import { 
    ON_SOLVE,
    NEXT_LVL
} from '../constants/game.constants';

const initialState = {
    current: 1,
    ids: [0, 1],
    byid: {
        0: {
            solved: false
        },
        1: {
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
        case NEXT_LVL: {
            let currLvl = state.current;
            
            return {...state, current: currLvl == state.ids.length ? currLvl: currLvl++ };
        }
        default: {
            return state;
        }
    }
}