/** 이정민
 * 동상 입장 퇴장 리듀서
 */

import { ENTER_STATUE, INIT_STATUE, LEAVE_STATUE } from "../actions/actions";

const initialState = {inStatue: false};

export function statueReducer(state=initialState,action){
    switch(action.type){
        case INIT_STATUE:
            return {
                ...state,
                inStatue: false
            }
        case ENTER_STATUE:
            return{
                ...state,
                inStatue: true,
            };
        case LEAVE_STATUE:
            return{
                ...state,
                inStatue: false,
            };
        default:
            return state;
    }
};