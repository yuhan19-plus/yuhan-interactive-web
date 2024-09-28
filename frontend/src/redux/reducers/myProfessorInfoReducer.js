import { MY_PROFESSOR_INFO } from "../actions/actions"

const initialState = {
    myProfessorId: "",
    myProfessorName: "",
    myProfessorMajor: "",
    myProfessorPhone: "",
    myProfessorEmail: "",
    myProfessorPosition: ""
}

export function myProfessorInfoReducer(state = initialState, action) {
    switch(action.type) {
        case MY_PROFESSOR_INFO:
            return {
                ...state,
                myProfessorId: action.payload[0].user_id,
                myProfessorName: action.payload[0].user_name,
                myProfessorMajor: action.payload[0].user_major,
                myProfessorPhone: action.payload[0].user_phone,
                myProfessorEmail: action.payload[0].user_email,
                myProfessorPosition: action.payload[0].user_position
            }
        default:
            return state
    }
}