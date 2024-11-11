/** 이석재
 * 갤러리 데이터 리듀서
 */
import { GALLERY_WORK_DATA, GALLERY_PICTURE_DATA } from '../actions/actions';

const initialState = {
    workData: [],
    pictureData: [],
};

export function galleryDataReducer(state = initialState, action) {
    switch (action.type) {
        case GALLERY_WORK_DATA:
            return {
                ...state,
                workData: action.payload, // workData에 새로운 데이터 저장
            };
        case GALLERY_PICTURE_DATA:
            return {
                ...state,
                pictureData: action.payload, // pictureData에 새로운 데이터 저장
            };
        default:
            return state;
    }
}

export default galleryDataReducer;
