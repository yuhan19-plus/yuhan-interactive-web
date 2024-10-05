/** 임성준
 * 캐릭터 리듀서
 * (테스트용으로 작업)
 */

import { INIT_CHARACTER, MAIN_CHARACTER, MAIN_CHARACTER_DEPT } from "../actions/actions";
// 280, 0, -355
const initialState = {
    name: '',
    currentPosition: [280, 0, -355],
    deptInitPosition: [0, -2, 0]
}

export function mainCharReducer(state = initialState, action) {
    switch(action.type) {
        case INIT_CHARACTER:
            return {
                ...state,
                name: '',
                currentPosition: [280, 0, -355],
                deptInitPosition: [0, 0, 0]
            }
        case MAIN_CHARACTER:
            // console.log('action.payload', action.payload)
            return {
                ...state,
                name: 'SJ',
                currentPosition: action.payload,
                deptInitPosition: state.deptInitPosition
            }
        case MAIN_CHARACTER_DEPT:
            return {
                ...state,
                name: 'SJ',
                currentPosition: state.currentPosition,
                deptInitPosition: action.payload
            }
        default:
            return state
    }
}