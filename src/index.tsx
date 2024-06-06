import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import ReactDOM from 'react-dom/client';
import './index.css';
// import store from './state/store-custom';
import store from './state/store-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const rerenderEntireTree = () => {
    root.render(
        <BrowserRouter>
            <App store={store}
            />
        </BrowserRouter>
    );
};

rerenderEntireTree();
store.subscribe(rerenderEntireTree);