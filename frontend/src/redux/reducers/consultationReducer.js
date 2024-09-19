import { COUNSEL_DATE, MY_COUNSEL, REQ_FOR_CONSULTATION, REQ_FOR_CONSULTATION_LIST } from "../actions/actions"

const initialState = {
    name: '상담이력'
}

export function consultationReducer(state = initialState, action) {
    switch(action.type) {
        case MY_COUNSEL:
            return {
                ...state,
                // value: !state.value,
                name: '상담이력'
            }
        case COUNSEL_DATE:
            return {
                ...state,
                // value: !state.value,
                name: '상담날짜'
            }
        case REQ_FOR_CONSULTATION:
            return {
                ...state,
                // value: !state.value,
                name: '상담신청'
            }
        case REQ_FOR_CONSULTATION_LIST:
            return {
                ...state,
                name: '상담신청목록'
            }
        default:
            return state
    }
}