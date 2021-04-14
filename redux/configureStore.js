import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { comments } from './comments';
import { services } from './services';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            services,
            comments
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}