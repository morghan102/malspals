import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reviews } from './reviews';
import { services } from './services';
import { clientImages } from './clientImages';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            services,
            reviews,
            clientImages
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}