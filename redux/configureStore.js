import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // this is for debugging with React-Native-Debugger, you may leave it out
import { reviews } from './reviews';
import { services } from './services';
import { clientImages } from './clientImages';
import { pets } from './pets';
import { users } from './users';
import { login } from './login';


export const ConfigureStore = () => {

    const store = createStore(
        combineReducers({
            services,
            reviews,
            clientImages,
            pets,
            users,
            login,
        }),
        applyMiddleware(thunk, logger),
        // may get problems w that below:
        // composeWithDevTools(applyMiddleware(thunk))
    );

    return store;
}