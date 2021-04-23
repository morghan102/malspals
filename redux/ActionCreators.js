import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchReviews = () => dispatch => {
    return fetch(baseUrl + 'reviews')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(reviews => dispatch(addReviews(reviews)))
        .catch(error => dispatch(reviewsFailed(error.message)));
};

export const reviewsFailed = errMess => ({
    type: ActionTypes.REVIEWS_FAILED,
    payload: errMess
});

export const addReviews = reviews => ({
    type: ActionTypes.ADD_REVIEWS,
    payload: reviews
});

export const reviewsLoading = () => ({
    type: ActionTypes.REVIEWS_LOADING
});





export const fetchServices = () => dispatch => {

    dispatch(servicesLoading());

    return fetch(baseUrl + 'services')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(services => dispatch(addServices(services)))
        .catch(error => dispatch(servicesFailed(error.message)));
};

export const servicesLoading = () => ({
    type: ActionTypes.SERVICES_LOADING
});

export const servicesFailed = errMess => ({
    type: ActionTypes.SERVICES_FAILED,
    payload: errMess
});

export const addServices = services => ({
    type: ActionTypes.ADD_SERVICES,
    payload: services
});





export const fetchClientImages = () => dispatch => {

    // dispatch(clientImagesLoading());

    return fetch(baseUrl + 'clientImages')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(clientImages => dispatch(addClientImages(clientImages)))
        .catch(error => dispatch(clientImagesFailed(error.message)));
};

export const clientImagesLoading = () => ({
    type: ActionTypes.CLIENTIMAGES_LOADING
});

export const clientImagesFailed = errMess => ({
    type: ActionTypes.CLIENTIMAGES_FAILED,
    payload: errMess
});

export const addClientImages = clientImages => ({
    type: ActionTypes.ADD_CLIENTIMAGES,
    payload: clientImages
});






export const fetchPets = () => dispatch => {
    return fetch(baseUrl + 'pets')
        .then(response => {
                if (response.ok) {
                    // console.log(response);
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(pets => dispatch(addPets(pets)))
        .catch(error => dispatch(petsFailed(error.message)));
};

export const petsFailed = errMess => ({
    type: ActionTypes.PETS_FAILED,
    payload: errMess
});

export const addPets = pets => ({
    type: ActionTypes.ADD_PETS,
    payload: pets
});

export const postPets = (ownerId, name, species, size, special_requirements ) => dispatch => {
    const date = new Date();

    const newPet = {
        ownerId,
        name,
        species,
        size,
        special_requirements?
    };

    setTimeout(() => {
        dispatch(addPet(newPet));
    }, 2000);
};

export const addPet = (pet) => ({
    type: ActionTypes.ADD_PET,
    payload: pet

});

export const fetchUsers = () => dispatch => {

    dispatch(usersLoading());

    return fetch(baseUrl + 'users')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(users => dispatch(addusers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
};

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const usersFailed = errMess => ({
    type: ActionTypes.USERS_FAILED,
    payload: errMess
});

export const addUsers = users => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});