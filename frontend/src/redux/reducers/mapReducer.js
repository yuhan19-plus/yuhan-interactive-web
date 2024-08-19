import { DEPT_MAP, YH_MAP } from "../actions/actions";

const initialState = {
    mapName: 'yh_map'
}

export function mapReducer(state = initialState, action) {
    switch(action.type) {
        case YH_MAP:
            return {
                ...state,
                mapName: 'yh_map'
            }
        case DEPT_MAP:
            return {
                ...state,
                mapName: 'dept_map'
            }
        default:
            return state
    }
}