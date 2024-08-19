// 파일생성자 : 임성준
import { INIT_SIDE_MENU, SIDE_MENU_BOARD, SIDE_MENU_CONSULTATION, SIDE_MENU_DEPT_REC, SIDE_MENU_FOOD } from "../actions/actions";

const initialState = {
    value: false,
    name: ''
}

export function sideMenuReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_SIDE_MENU:
            return {
                ...state,
                value: false,
                name: ''
            }
        case SIDE_MENU_CONSULTATION:
            return {
                ...state, // 항상 앞쪽에 작성해야함 - 성준
                value: !state.value,
                name: 'consultation'
            }
        case SIDE_MENU_BOARD:
            return {
                ...state,
                value: !state.value,
                name: 'board'
            }
        case SIDE_MENU_FOOD:
            return {
                ...state,
                value: !state.value,
                name: 'food'
            }
        case SIDE_MENU_DEPT_REC:
            return {
                ...state,
                value: !state.value,
                name: 'deptRec'
            }
        default:
            return state
    }
}