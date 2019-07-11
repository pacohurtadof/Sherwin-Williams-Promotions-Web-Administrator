import * as types from '../../actions/promotions/action-types';


const initialState = []

const promotionsAndroidReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_ANDROID_DATA: {
            return { 
                ...action.payload
            }
        }
        default:
            return { ...state };
    }
};

export default promotionsAndroidReducer;