import * as types from '../../actions/promotions/action-types';

const initialState = []

const promotionsIosReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_IOS_DATA:{
            return { 
                ...action.payload
            }
        }
        default:
            return { ...state };
    }
};

export default promotionsIosReducer;