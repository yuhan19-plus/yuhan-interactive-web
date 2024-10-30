/** 임성준
 * 미니맵 상단 버튼 3개 그룹 관련 리듀서
 * 현재 항공뷰만 추가한 상태 필요에 따라 case문 추가 할 것
 * 오자현
 * 찾아오는 길 뷰 상태 추가
 */

import { AERIAL_VIEW, DIRECTIONS_VIEW, GUIDE_VIEW, INIT_VIEW, SMOKINGAREA_VIEW } from "../actions/actions"

const initialState = {
    value: false,
    viewName: ''
}

export function viewReducer(state = initialState, action) {
    switch(action.type) {
        case INIT_VIEW:
            return {
                ...state,
                value: false,
                viewName: ''
            }
        case AERIAL_VIEW:
            return {
                ...state,
                value: !state.value,
                viewName: 'aerialView'
            }
        case DIRECTIONS_VIEW:
            return {
                ...state,
                value: !state.value,
                viewName: 'directionsView'
            }
        case SMOKINGAREA_VIEW:
            return {
                ...state,
                value: !state.value,
                viewName: 'smokingAreaView'
            }
        case GUIDE_VIEW:
            return {
                ...state,
                value: !state.value,
                viewName: 'campusGuideView'
            }
        default:
            return state
    }
}