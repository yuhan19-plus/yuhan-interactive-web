/** 임성준
 * 미니맵 상단 버튼 3개 그룹 관련 리듀서
 * 현재 항공뷰만 추가한 상태 필요에 따라 case문 추가 할 것
 */

import { AERIAL_VIEW } from "../actions/actions"

const initialState = {
    value: false,
    btnMenuName: ''
}

export function menuBtnReducer(state = initialState, action) {
    switch(action.type) {
        case AERIAL_VIEW:
            return {
                ...state,
                value: !state.value,
                btnMenuName: 'aerialView'
            }
        default:
            return state
    }
}