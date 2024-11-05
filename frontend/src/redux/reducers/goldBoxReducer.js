/**
 * 오자현 보물상자영역 리듀서
 */
import { ENTER_GOLDBOXAREA, INIT_GOLDBOXAREA, LEAVE_GOLDBOXAREA } from "../actions/actions";

const initialState = {
    isZone1: false, // 1번 영역 진입 여부 (유재라관)
    isZone2: false, // 2번 영역 진입 여부 (테라스)
    isZone3: false,  // 3번 영역 진입 여부 (농구장)
    // 아래의 3개는 한번이라도 진입했는지 여부
    hasVisitedZone1: false, // 1번 영역
    hasVisitedZone2: false, // 2번 영역
    hasVisitedZone3: false, // 3번 영역
};

export function goldBoxReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_GOLDBOXAREA:
            return {
                ...state,
                isZone1: false,
                isZone2: false,
                isZone3: false,
            }
        case ENTER_GOLDBOXAREA:
            // console.log('진입한 zone:', action.zone);
            return {
                ...state,
                [action.zone]: true,  // 진입한 영역의 상태를 true로 설정
            };
        case LEAVE_GOLDBOXAREA:
            return {
                ...state,
                [action.zone]: false, // 떠난 영역의 상태를 false로 설정
                [action.hasVisited]: true,  // 진입한 영역의 방문 이력을 true로 설정
            };
        default:
            return state;
    }
}
