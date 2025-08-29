import React from 'react';
import {HashRouter} from 'react-router-dom';
import App from './App';
import ReactDOM from 'react-dom/client';
import './index.css';
// import store from './state/store-custom';
import store from './state/store-redux';
// import {Provider} from './state/store-context';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// const rerenderEntireTree = () => {
    root.render(
        <HashRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    );
// };

// rerenderEntireTree();
// store.subscribe(rerenderEntireTree);