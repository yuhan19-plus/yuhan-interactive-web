/**
 * 오자현 보물상자영역 리듀서
 */
import { ENTER_GOLDBOXAREA, INCREASE_GOLDBOX_COUNT, LEAVE_GOLDBOXAREA, RESET_GOLDBOX_COUNT } from "../actions/actions";

const initialState = {
    value: false,
    name: '',
    goldBoxCount: 0,
    isZone1: false, // 1번 영역 진입 여부 (유재라관)
    isZone2: false, // 2번 영역 진입 여부 (테라스)
    isZone3: false,  // 3번 영역 진입 여부 (농구장)
    hasVisitedZone1: false, // 1번 영역에 들어왔었는지 여부
    hasVisitedZone2: false, // 2번 영역에 들어왔었는지 여부
    hasVisitedZone3: false, // 3번 영역에 들어왔었는지 여부

};

export function goldBoxReducer(state = initialState, action) {
    switch (action.type) {
        case ENTER_GOLDBOXAREA:
            // console.log('진입한 zone:', action.zone);
            console.log('hasVisitedZone1도착여부', state.hasVisitedZone1)
            if (state.hasVisitedZone1 || state.hasVisitedZone2 || state.hasVisitedZone3) {
                console.log("이미 발견한 보물상자 영역입니다.");
                return state;
            } else {
                return {
                    ...state,
                    [action.zone]: true,  // 진입한 영역의 상태를 true로 설정
                    name: '진입'
                };
            }
        case LEAVE_GOLDBOXAREA:
            return {
                ...state,
                [action.zone]: false, // 떠난 영역의 상태를 false로 설정
                [action.hasVisited]: true,  // 진입한 영역의 방문 이력을 true로 설정
                name: '떠남'
            };
        case INCREASE_GOLDBOX_COUNT:
            return {
                ...state,
                goldBoxCount: state.goldBoxCount + action.payload, // 카운트 증가
            };
        case RESET_GOLDBOX_COUNT:
            return {
                ...state,
                goldBoxCount: 0, // 카운트 초기화
            };
        default:
            return state;
    }
}
