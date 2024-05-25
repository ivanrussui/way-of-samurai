import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import ReactDOM from 'react-dom/client';
import './index.css';
import {store} from './state/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const rerenderEntireTree = () => {
    root.render(
        <BrowserRouter>
            <App state={store.getState()}
                 dispatch={store.dispatch.bind(store)}
            />
        </BrowserRouter>
    );
};

rerenderEntireTree();
store.subscribe(rerenderEntireTree);