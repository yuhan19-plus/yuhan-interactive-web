import { DEPT_HEAD_ANI_INIT, DEPT_HEAD_ANI_MOVE } from "../actions/actions"

const initialState = {
    value: false,
    animationName: ''
}

export function deptHeadAnimationReducer(state = initialState, action) {
    switch(action.type) {
        case DEPT_HEAD_ANI_INIT:
            return {
                ...state,
                value: false,
                animationName: ''
            }
        case DEPT_HEAD_ANI_MOVE:
            return {
                ...state,
                value: !state.value,
                animationName: 'move'
            }
        default:
            return state
    }
}