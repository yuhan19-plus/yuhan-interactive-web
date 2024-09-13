// 파일 생성자 : 임성준

import { combineReducers } from "redux";
import { sideMenuReducer } from "./sideMenuReducer";
import { mapReducer } from "./mapReducer";
import { modalReducer } from "./modalReducer";
import { mainCharReducer } from "./mainCharReducer";
import { menuBtnReducer } from "./menuBtnReducer";
import { kioskReducer } from "./kioskReducer";

// 모든 리듀서 결합 - 성준
const rootReducer = combineReducers({
    // 성준
    sideMenu: sideMenuReducer,
    groundMap: mapReducer,
    modal: modalReducer,
    mChar: mainCharReducer,
    btnMenu: menuBtnReducer,
    kiosk: kioskReducer

    // 석재

    // 자현

    // 정민
})

export default rootReducer