import { MINI_MAP_TELEPORT } from "../actions/actions";

const initialState = {
    value: false,
    position: []
}

export function miniMapReducer(state = initialState, action) {
    switch(action.type) {
        case MINI_MAP_TELEPORT:
            return {
                ...state,
                value: !state.value,
                position: action.payload
            }

        default:
            return state
    }
}