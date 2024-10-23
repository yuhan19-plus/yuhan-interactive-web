/** 이석재
 * 갤러리 입장 퇴장 리듀서
 */

import { ENTER_FIRST_WORK, LEAVE_FIRST_WORK, ENTER_SECOND_WORK, LEAVE_SECOND_WORK, ENTER_THIRD_WORK, LEAVE_THIRD_WORK} from "../actions/actions";

const initialState = {
    inFirstWork: false,
    inSecondWork: false,
    inThirdWork: false,
};

export function galleryAreaReducer(state=initialState,action){
    switch(action.type){
        case ENTER_FIRST_WORK:
            return{
                ...state,
                inFirstWork: true,
            };
        case LEAVE_FIRST_WORK:
            return{
                ...state,
                inFirstWork: false,
            };
        case ENTER_SECOND_WORK:
            return{
                ...state,
                inSecondWork: true,
            };
        case LEAVE_SECOND_WORK:
            return{
                ...state,
                inSecondWork: false,
            };
        case ENTER_THIRD_WORK:
            return{
                ...state,
                inThirdWork: true,
            };
        case LEAVE_THIRD_WORK:
            return{
                ...state,
                inThirdWork: false,
            };
        default:
            return state;
    }
};