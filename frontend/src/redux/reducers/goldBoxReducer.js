/**
 * 오자현 보물상자영역 리듀서
 * 졸린상태로 코딩이라 초기화를 추가했으나 왜 추가했는지 모르겠음 일단 나중에 제정신일 때 다시 검토하자
 */
import { ENTER_GOLDBOXAREA, INIT_GOLDBOXAREA, LEAVE_GOLDBOXAREA } from "../actions/actions";

const initialState = {
    value: false,
    name: '',
    goldBoxCount: 0,
    isZone1: false, // 1번 영역 진입 여부 (유재라관)
    isZone2: false, // 2번 영역 진입 여부 (테라스)
    isZone3: false,  // 3번 영역 진입 여부 (농구장)
    // 아래의 3개는 한번이라도 진입했는지 여부를 따지는 것이라서 초기화 하면 X
    hasVisitedZone1: false, // 1번 영역에 들어왔었는지 여부
    hasVisitedZone2: false, // 2번 영역에 들어왔었는지 여부
    hasVisitedZone3: false, // 3번 영역에 들어왔었는지 여부
};

export function goldBoxReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_GOLDBOXAREA:
            return {
                ...state,
                value: false,
                name: '',
                goldBoxCount: 0,
                isZone1: false, // 1번 영역 진입 여부 (유재라관)
                isZone2: false, // 2번 영역 진입 여부 (테라스)
                isZone3: false,  // 3번 영역 진입 여부 (농구장)
            }
        case ENTER_GOLDBOXAREA:
            // console.log('진입한 zone:', action.zone);
            console.log('hasVisitedZone1도착여부', state.hasVisitedZone1)
            return {
                ...state,
                [action.zone]: true,  // 진입한 영역의 상태를 true로 설정
                name: '진입'
            };
        case LEAVE_GOLDBOXAREA:
            return {
                ...state,
                [action.zone]: false, // 떠난 영역의 상태를 false로 설정
                [action.hasVisited]: true,  // 진입한 영역의 방문 이력을 true로 설정
                name: '떠남'
            };
        default:
            return state;
    }
}
