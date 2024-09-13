import { INIT_KIOSK, KIOSK_BONGSA, KIOSK_CHANGJO, KIOSK_JAYU, KIOSK_MEMORIAL_HALL, KIOSK_NANUM, KIOSK_PYEONGHWA_ONE, KIOSK_PYEONGHWA_TWO, KIOSK_STUDENT_CAFETERIA, KIOSK_YUJAELA } from "../actions/actions"

const initialState = {
    value: false,
    name: ''
}

export function kioskReducer(state = initialState, action) {
    switch(action.type) {
        case INIT_KIOSK:
            return {
                ...state,
                value: false,
                name: ''
            }
        case KIOSK_PYEONGHWA_ONE:
            return {
                ...state,
                value: !state.value,
                name: '평화관 정문'
            }
        case KIOSK_PYEONGHWA_TWO:
            return {
                ...state,
                value: !state.value,
                name: '평화관 후문'
            }
        case KIOSK_BONGSA:
            return {
                ...state,
                value: !state.value,
                name: '봉사관'
            }
        case KIOSK_JAYU:
            return {
                ...state,
                value: !state.value,
                name: '자유관'
            }
        case KIOSK_STUDENT_CAFETERIA:
            return {
                ...state,
                value: !state.value,
                name: '학생회관'
            }
        case KIOSK_NANUM:
            return {
                ...state,
                value: !state.value,
                name: '나눔관'
            }
        case KIOSK_CHANGJO:
            return {
                ...state,
                value: !state.value,
                name: '창조관'
            }
        case KIOSK_MEMORIAL_HALL:
            return {
                ...state,
                value: !state.value,
                name: '유일한기념관'
            }
        case KIOSK_YUJAELA:
            return {
                ...state,
                value: !state.value,
                name: '유재라관'
            }
        default:
            return state
    }
}