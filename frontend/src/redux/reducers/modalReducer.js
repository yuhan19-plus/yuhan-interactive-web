/** 임성준
 * 모달 리듀서
 */
import { ADMIN_ENTER_MODAL, INIT_MODAL } from "../actions/actions"

const initialState = {
    value: false,
    name: ''
}

export function modalReducer(state = initialState, action) {
    switch(action.type) {
        case INIT_MODAL:
            return {
                ...state,
                value: false,
                name: ''
            }
        case ADMIN_ENTER_MODAL:
            return {
                ...state,
                value: !state.value,
                name: 'adminEnterModal'
            }
        default:
            return state
    }
}