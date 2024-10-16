import { ENTER_CODINGAREA, LEAVE_CODINGAREA } from "../actions/actions"

const initialState = {
    value: false,
    name: ''
}

export function codingAreaReducer(state = initialState, action) {
    switch (action.type) {
        case ENTER_CODINGAREA:
            return {
                ...state,
                value: !state.value,
                name: '진입'
            }
        case LEAVE_CODINGAREA:
            return {
                ...state,
                value: !state.value,
                name: '떠남'
            }
        default:
            return state
    }
}