// 파일 생성자 : 임성준

import { combineReducers } from "redux";
import { sideMenuReducer } from "./sideMenuReducer";
import { mapReducer } from "./mapReducer";
import { modalReducer } from "./modalReducer";

// 모든 리듀서 결합 - 성준
const rootReducer = combineReducers({
    sideMenu: sideMenuReducer,
    groundMap: mapReducer,
    modal: modalReducer
})

export default rootReducer