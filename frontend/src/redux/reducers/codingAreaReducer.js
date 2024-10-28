/**
 * 오자현 코딩영역 여부 리듀서
 */
import { ENTER_CODINGAREA, INIT_CODINGAREA, LEAVE_CODINGAREA } from "../actions/actions"

const initialState = {
    value: false,
    name: ''
}

export function codingAreaReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_CODINGAREA:
            return {
                ...state,
                value: false,
                name: ''
            }
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