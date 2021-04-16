import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reviews } from './reviews';
import { services } from './services';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            services,
            reviews
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}