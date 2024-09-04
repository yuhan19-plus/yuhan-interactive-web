import { MAIN_CHARACTER } from "../actions/actions";

const initialState = {
    name: ''
}

export function mainCharReducer(state = initialState, action) {
    switch(action.type) {
        case MAIN_CHARACTER:
            return {
                ...state,
                name: 'SJ'
            }
        default:
            return state
    }
}