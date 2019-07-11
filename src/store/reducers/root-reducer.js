import { combineReducers } from 'redux'
import promotionsReducer from './promotions-reducer';
import imagesReducer from  './images-reducer';
import promotionsAndroidReducer from './promotions-android-reducer'
import promotionsIosReducer from './promotions-ios-reducer'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    promotions: promotionsReducer,
    android: promotionsAndroidReducer,
    ios: promotionsIosReducer,
    images: imagesReducer
});

export default rootReducer;