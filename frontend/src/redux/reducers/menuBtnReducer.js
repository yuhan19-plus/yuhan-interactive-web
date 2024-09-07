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