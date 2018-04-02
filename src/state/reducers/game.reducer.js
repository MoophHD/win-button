import { AsyncStorage } from 'react-native';
import { 
    ON_SOLVE,
    NEXT_LVL,
    CLEAR
} from '../constants/game.constants';

const initialState = {
    current: 0,
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
        case CLEAR: {
            AsyncStorage.clear();
            let nextByid = {...state.byid};
            let stateIds = state.ids;
            let id;
            for (let i = 0; i < stateIds.length; i++) {
                id = stateIds[i];
                //if finds smth unsolved
                if (!nextByid[id].solved) break;
                nextByid[id].solved = false;
            }
            
            return {...state, 
                    current: 0,
                    byid: nextByid
                };
        }
        case ON_SOLVE: {
            //save somewhere
            let storeSolved = getData("solved");
            let solvedArr = storeSolved || [];
            setData("solved", [...solvedArr, action.id]);
            return {...state, byid: {...state.byid,
                [action.id]: { solved: true }
            }}
        }
        case NEXT_LVL: {
            
            let currLvl = state.current;
            let nextLvl = currLvl == state.ids.length ? currLvl : currLvl + 1;
            if (currLvl != nextLvl) setData("current", nextLvl);
            return {...state, current: nextLvl };
        }
        default: {
            return state;
        }
    }
}

async function setData(name, value) {
  await AsyncStorage.setItem(name, JSON.stringify(value));
}

async function getData(name) {
    try {
        const value = await AsyncStorage.getItem(name);
        if (value) return value;
    } catch (error) {
        console.log(`failed to get ${name} error:`, error);
    }
}