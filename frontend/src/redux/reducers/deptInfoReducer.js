import { DEPT_INFO_CAREER_EMPLOYMENT_FIELD, DEPT_INFO_DEPT_FEATURES, DEPT_INFO_EDU_GOALS, DEPT_INFO_LICENSE, DEPT_INFO_MAIN_EDU_FIELDS, INIT_DEPT_INFO } from "../actions/actions";

const initialState = {
    value: false,
    deptInfoName: ''
}

export function deptInfoReducer(state = initialState, action) {
    switch(action.type) {
        case INIT_DEPT_INFO:
            return {
                ...state,
                value: false,
                deptInfoName: ''
            }
        case DEPT_INFO_EDU_GOALS: 
            return {
                ...state,
                value: !state.value,
                deptInfoName: '교육목표'
            }
        case DEPT_INFO_MAIN_EDU_FIELDS:
            return {
                ...state,
                value: !state.value,
                deptInfoName: '주요교육분야'
            }
        case DEPT_INFO_CAREER_EMPLOYMENT_FIELD:
            return {
                ...state,
                value: !state.value,
                deptInfoName: '진로 및 취업 분야'
            }
        case DEPT_INFO_LICENSE:
            return {
                ...state,
                value: !state.value,
                deptInfoName: '자격증'
            }
        case DEPT_INFO_DEPT_FEATURES:
            return {
                ...state,
                value: !state.value,
                deptInfoName: '학과특징'
            }
        default:
            return state
    }
}