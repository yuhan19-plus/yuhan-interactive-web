/** 임성준
 * 캐릭터 리듀서
 * (테스트용으로 작업)
 */

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