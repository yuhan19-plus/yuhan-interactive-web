import { CURRENT_PROFESSOR_USER, CURRENT_STUDENT_USER } from "../actions/actions"

const initialState = {
    user_id: "",
    user_name: "",
    user_phone: "",
    user_email: "",
    user_major: "",
    student_number: 0,
    student_grade: 0,
    professor_position: "",
    user_type: ""
}

export function currentUserInfoReducer(state = initialState, action) {
    switch(action.type) {
        case CURRENT_STUDENT_USER:
            // console.log('action.payload', action.payload)
            return {
                ...state,
                user_id: action.payload[0].user_id,
                user_name: action.payload[0].user_name,
                user_phone: action.payload[0].user_phone,
                user_email: action.payload[0].user_email,
                user_major: action.payload[0].user_major,
                student_number: action.payload[0].student_number,
                student_grade: action.payload[0].student_grade,
                professor_position: state.professor_position,
                user_type: "student"
            }
        case CURRENT_PROFESSOR_USER:
            return {
                ...state,
                user_id: action.payload[0].user_id,
                user_name: action.payload[0].user_name,
                user_phone: action.payload[0].user_phone,
                user_email: action.payload[0].user_email,
                user_major: action.payload[0].user_major,
                student_number: state.student_number,
                student_grade: state.student_grade,
                professor_position: action.payload[0].professor_position,
                user_type: "professor"
            }
        default:
            return state
    }
}