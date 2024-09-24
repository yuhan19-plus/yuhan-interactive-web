import { INIT_MINI_MAP_TELEPORT, MINI_MAP_TELEPORT } from "../actions/actions";

const initialState = {
    value: false,
    position: []
}

export function miniMapReducer(state = initialState, action) {
    switch(action.type) {
        case INIT_MINI_MAP_TELEPORT:
            return {
                ...state,
                value: false,
                position: state.position
            }
        case MINI_MAP_TELEPORT:
            // console.log('텔레포트 이동 값', state.value)
            return {
                ...state,
                value: true,
                position: action.payload
            }

        default:
            return state
    }
}