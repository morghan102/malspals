import React from 'react';
import Main from './navigation/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Providers from './navigation/index';


const store = ConfigureStore();

export default function App() {
    return (
        // <Provider store={store}>
        //     <Main />
        // </Provider>
        <Providers />

    );
}

//change