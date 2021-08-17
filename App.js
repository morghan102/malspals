import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

export default function App() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}


// that tutorial has this, which is a combo of app.js and redux/configurestore. there are some differences i configuration. Not sure if it will work anyways without making the changes below
// import React from 'react'
// import { createStore, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import thunkMiddleware from 'redux-thunk'

// import SwitchNavigator from './navigation/SwitchNavigator'
// import reducer from './reducers'

// const middleware = applyMiddleware(thunkMiddleware)
// const store = createStore(reducer, middleware)

// export default class App extends React.Component {
//     render() {
//         return (
//             <Provider store={store}>
//                 <SwitchNavigator />
//             </Provider>
//         )
//     }
// }