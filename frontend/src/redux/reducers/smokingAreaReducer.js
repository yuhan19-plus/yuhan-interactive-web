/** 이석재
 * 흡연장 입장 퇴장 리듀서
 */

import { ENTER_SMOKINGAREA, LEAVE_SMOKINGAREA } from "../actions/actions";

const initialState = {inSmokingArea: false};

export function smokingAreaReducer(state=initialState,action){
    switch(action.type){
        case ENTER_SMOKINGAREA:
            return{
                ...state,
                inSmokingArea: true,
            };
        case LEAVE_SMOKINGAREA:
            return{
                ...state,
                inSmokingArea: false,
            };
        default:
            return state;
    }
};