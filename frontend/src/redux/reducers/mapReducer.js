/** 임성준
 * 맵 리듀서
 */

import { COMPUTER_SOFTWARE_MAP, DEPT_MAP, FOOD_NUTRITION_MAP, INDUSTRIAL_DESIGN_MAP, YH_MAP, YUHAN_LIFE_BIO_MAP } from "../actions/actions";

const initialState = {
    mapName: '',
    pathData: []
}

export function mapReducer(state = initialState, action) {
    switch(action.type) {
        case YH_MAP:
            return {
                ...state,
                mapName: 'yh_map',
                pathData: state
            }
        case DEPT_MAP:
            return {
                ...state,
                mapName: 'dept_map',
                pathData: state
            }
        case COMPUTER_SOFTWARE_MAP:
            return {
                ...state,
                mapName: 'computer_sw_map',
                pathData: action.payload
            }
        case INDUSTRIAL_DESIGN_MAP:
            return {
                ...state,
                mapName: 'industrial_design_map',
                pathData: action.payload
            }
        case FOOD_NUTRITION_MAP:
            return {
                ...state,
                mapName: 'food_nutrition_map',
                pathData: action.payload
            }
        case YUHAN_LIFE_BIO_MAP:
            return {
                ...state,
                mapName: 'yuhan_bio_map',
                pathData: action.payload
            }
        default:
            return state
    }
}