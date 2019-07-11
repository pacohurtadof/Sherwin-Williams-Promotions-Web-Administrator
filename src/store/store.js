import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/root-reducer';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from '../config/firebase-config';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase})),
        reactReduxFirebase(fbConfig),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),

);

export default store;