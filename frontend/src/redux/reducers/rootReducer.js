// 파일 생성자 : 임성준

import { combineReducers } from "redux";
import { statueReducer } from "./StatueReducer";
import { busReducer } from "./busReducer";
import { consultationReducer } from "./consultationReducer";
import { kioskReducer } from "./kioskReducer";
import { mainCharReducer } from "./mainCharReducer";
import { mapReducer } from "./mapReducer";
import { menuBtnReducer } from "./menuBtnReducer";
import { miniMapReducer } from "./miniMapReducer";
import { modalReducer } from "./modalReducer";
import { sideMenuReducer } from "./sideMenuReducer";
import { StudentKioskReducer } from "./studentKioskReducer";
import { currentUserInfoReducer } from "./currentUserInfoReducer";
import { myProfessorInfoReducer } from "./myProfessorInfoReducer";
import { smokingAreaReducer } from "./smokingAreaReducer";
import { deptInfoReducer } from "./deptInfoReducer";

// 모든 리듀서 결합 - 성준
const rootReducer = combineReducers({
    // 성준
    currentUser: currentUserInfoReducer,
    myProfessor: myProfessorInfoReducer,
    sideMenu: sideMenuReducer,
    groundMap: mapReducer,
    modal: modalReducer,
    mChar: mainCharReducer,
    btnMenu: menuBtnReducer,
    counsel: consultationReducer,
    kiosk: kioskReducer,
    teleport: miniMapReducer,
    deptInfo: deptInfoReducer,

    // 석재
    smokingArea: smokingAreaReducer,

    // 자현
    bus: busReducer,
    // 정민
    statue: statueReducer,
    studentKiosk: StudentKioskReducer
})

export default rootReducer