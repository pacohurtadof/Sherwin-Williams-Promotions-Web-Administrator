import * as types from '../../actions/images/action-types';

const initialState = {
    uploading: false,
    imageUrl: '',
    failure: false
};

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPLOADING:
            return {
                ...state,
                uploading: true
            }
        case types.SET_IMAGE_URL:
            return {
                ...state,
                uploading: false,
                imageUrl: action.data
            }
        default:
            return {...state};
    }  
};

export default imagesReducer;