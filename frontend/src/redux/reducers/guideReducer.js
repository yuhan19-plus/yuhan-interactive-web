import { GUIDE_STATUE, GUIDE_TV, GUIDE_WELCOME, INIT_GUIDE } from "../actions/actions";

const initialState = {
    value: false,
    guideAreaName: ''
}

export function guideReducer(state = initialState, action) {
    switch(action.type) {
        case INIT_GUIDE:
            return {
                ...state,
                value: false,
                guideAreaName: ''
            }
        case GUIDE_WELCOME:
            return {
                ...state,
                value: !state.value,
                guideAreaName: 'WelcomeZone'
            }
        case GUIDE_TV:
            return {
                ...state,
                valse: !state.value,
                guideAreaName: 'TVZone'
            }
        case GUIDE_STATUE:
            return {
                ...state,
                valse: !state.value,
                guideAreaName: 'StatueZone'
            }
        default:
            return state
    }
}