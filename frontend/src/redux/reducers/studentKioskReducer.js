/** 이정민
 * 동상 입장 퇴장 리듀서
 */

import { ENTER_STUDENTKIOSK, LEAVE_STUDENTKIOSK } from "../actions/actions";

const initialStudentKiosk = {inStudentKiosk: false};

export function StudentKioskReducer(state=initialStudentKiosk,action){
    switch(action.type){
        case ENTER_STUDENTKIOSK:
            return{
                ...state,
                inStudentKiosk: true,
            };
        case LEAVE_STUDENTKIOSK:
            return{
                ...state,
                inStudentKiosk: false,
            };
        default:
            return state;
    }
};