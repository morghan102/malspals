import { initialState } from './initialState';
import * as ActionTypes from './ActionTypes';

// not being used as of 4/28

export const login = (state = initialState, action) => {
    
    switch (action.type) {
        case ActionTypes.SET_LOGIN_STATE:
            return {
                ...state,
                ...action.payload, // this is what we expect to get back from API call and login page input
                isLoggedIn: true, // we set this as true on login
            };
        default:
            return state;
    }
};