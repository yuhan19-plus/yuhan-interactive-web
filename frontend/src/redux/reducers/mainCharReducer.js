/** 임성준
 * 캐릭터 리듀서
 * (테스트용으로 작업)
 */

import { MAIN_CHARACTER } from "../actions/actions";
// 280, 0, -355
const initialState = {
    name: '',
    currentPosition: [280, 0, -355]
}

export function mainCharReducer(state = initialState, action) {
    switch(action.type) {
        case MAIN_CHARACTER:
            console.log('action.payload', action.payload)
            return {
                ...state,
                name: 'SJ',
                currentPosition: action.payload
            }
        default:
            return state
    }
}