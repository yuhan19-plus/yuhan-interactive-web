/**
 * 오자현 코딩영역 리듀서
 * 
 * 임성준 리듀서 수정
 */

import { ENTER_CODING_AREA, INIT_CODING_AREA } from "../actions/actions"


const initialState = {
    value: false,
    // name: ''
}

export function codingAreaReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_CODING_AREA:
            return {
                ...state,
                value: false,
                // name: ''
            }
        case ENTER_CODING_AREA:
            return {
                ...state,
                value: true,
                // name: '진입'
            }
        // case LEAVE_CODINGAREA:
        //     return {
        //         ...state,
        //         value: !state.value,
        //         name: '떠남'
        //     }
        default:
            return state
    }
}