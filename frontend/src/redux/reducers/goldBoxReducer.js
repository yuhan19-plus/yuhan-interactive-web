/**
 * 오자현 보물상자영역 리듀서
 */
import { INIT_GOLDBOXAREA, ON_GOLDBOXAREAONE, ON_GOLDBOXAREATHREE, ON_GOLDBOXAREATWO } from "../actions/actions";

const initialState = {
    isZone: false,
    name: '',
    hasVisitedZone1: false,
    hasVisitedZone2: false,
    hasVisitedZone3: false,
};

export function goldBoxReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_GOLDBOXAREA:
            return {
                ...state,
                isZone: false,
                name: '',
            }
        case ON_GOLDBOXAREAONE:
            return {
                ...state,
                isZone: !state.isZone,
                name: '유재라관',
                hasVisitedZone1: state.hasVisitedZone1 || state.isZone,
            };
        case ON_GOLDBOXAREATWO:
            return {
                ...state,
                isZone: !state.isZone,
                name: '테라스',
                hasVisitedZone2: state.hasVisitedZone2 || state.isZone,
            };
        case ON_GOLDBOXAREATHREE:
            return {
                ...state,
                isZone: !state.isZone,
                name: '나눔의 숲',
                hasVisitedZone3: state.hasVisitedZone3 || state.isZone,
            };

        default:
            return state;
    }
}
