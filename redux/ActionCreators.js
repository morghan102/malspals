import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
// import { LoginUrl } from '../constants/Api'; this doesnt exist and the tutorial ddnt explain where this came from
import { Alert } from 'react-native';
import Firebase from '../config/Firebase.js'



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

export const postPets = (ownerId, name, species, size, special_requirements) => dispatch => {
    const date = new Date();

    const newPet = {
        ownerId,
        name,
        species,
        size,
        special_requirements
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


// for login. Not being used as of 4/28
// const setLoginState = loginData => {
//     return {
//         type: ActionTypes.SET_LOGIN_STATE,
//         payload: loginData,
//     };
// };

// export const login = loginInput => {
//     const { username, password } = loginInput;
//     return dispatch => {
//         return fetch(LoginUrl, {
//             method: 'POST',
//             // this involves a server or backend I think... causes errors rn bc i dont have anything more set up beyond this
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(loginInput),
//         })
//             .then((response) => response.json())
//             .then((json) => {
//                 if (json.msg === 'success') { // response success checking logic could differ
//                     dispatch(setLoginState({ ...json, userId: username })); // our action is called here
//                 } else {
//                     Alert.alert('Login Failed', 'Username or Password is incorrect');
//                 }
//             })
//             .catch((err) => {
//                 Alert.alert('Login Failed', 'Some error occured, please retry');
//                 console.log(err);
//             });
//     };
// };


// added 8/16 from https://heartbeat.fritz.ai/how-to-build-an-email-authentication-app-with-firebase-firestore-and-react-native-a18a8ba78574
export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export const updatePassword = password => {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

export const login = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await Firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch({ type: LOGIN, payload: response.user })
        } catch (e) {
            console.log(e)
        }
    }
}

export const signup = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().user
            const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
            dispatch({ type: SIGNUP, payload: response.user })
        } catch (e) {
            console.log(e)
        }
    }
}
// Inside the methods login and signup, we’re writing the same business logic to interact with the Firebase authentication service that we did previously in Login and Signup components separately. Also, we’re dispatching the user from each of these actions in order to trigger the changes in the app's state. The only way to change the app's state is through action. The getState method used in the above snippet allows accessing the current state of the application.