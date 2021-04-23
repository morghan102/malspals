import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reviews } from './reviews';
import { services } from './services';
import { clientImages } from './clientImages';
import { pets } from './pets';
import { users } from './users';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            services,
            reviews,
            clientImages,
            pets,
            users,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}