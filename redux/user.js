//update email and password arent working so I'm removing them



import * as ActionTypes from './ActionTypes';
 
export const user = (state = { }, //state used to equal the vals below. Not sure if I'll need
    // isLoading: true, errMess: null, users: []}, 
    
    action) => {
    switch (action.type) {
        // case ActionTypes.ADD_USERS:
        //     return {...state, isLoading: false, errMess: null, users: action.payload};
        // case ActionTypes.USERS_LOADING:
        //     return {...state, isLoading: true, errMess: null, users: []};
        // case ActionTypes.USERS_FAILED:
        //     return {...state, isLoading: false, errMess: action.payload};
            case ActionTypes.LOGIN:
                return action.payload
            case ActionTypes.SIGNUP:
                return action.payload
            // case ActionTypes.UPDATE_EMAIL:
            //     return { ...state, email: action.payload }
            // case ActionTypes.UPDATE_PASSWORD:
            //     return { ...state, password: action.payload }
            default:
                return state
        }
    }


// import { combineReducers } from 'redux';
// import { LOGIN, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD } from './ActionTypes';

// const user = (state = {}, action) => {
//     switch (action.type) {
//         case LOGIN:
//             return action.payload
//         case SIGNUP:
//             return action.payload
//         case UPDATE_EMAIL:
//             return { ...state, email: action.payload }
//         case UPDATE_PASSWORD:
//             return { ...state, password: action.payload }
//         default:
//             return state
//     }
// }

// const rootReducer = combineReducers({
//     user
// })

// export default rootReducer;