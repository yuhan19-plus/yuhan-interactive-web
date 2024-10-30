/** 이석재
 * 흡연장 입장 퇴장 리듀서
 */

import { INIT_SMOKING_AREA, ON_SMOKING_AREA } from "../actions/actions";

const initialState = {value: false};

export function smokingAreaReducer(state=initialState,action){
    switch(action.type){
        case INIT_SMOKING_AREA:
            return {
                ...state,
                value: false
            }
        case ON_SMOKING_AREA:
            return {
                ...state,
                value: !state.value
            }
        // case ENTER_SMOKINGAREA:
        //     return{
        //         ...state,
        //         value: !state.value,
        //     };
        // case LEAVE_SMOKINGAREA:
        //     return{
        //         ...state,
        //         value: !state.value,
        //     };
        default:
            return state;
    }
};