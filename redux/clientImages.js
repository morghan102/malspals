import * as ActionTypes from './ActionTypes';

export const clientImages = (state = { isLoading: true,
                                    errMess: null,
                                    clientImages: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CLIENTIMAGES:
            return {...state, isLoading: false, errMess: null, clientImages: action.payload};
        case ActionTypes.CLIENTIMAGES_LOADING:
            return {...state, isLoading: true, errMess: null, clientImages: []};
        case ActionTypes.CLIENTIMAGES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};