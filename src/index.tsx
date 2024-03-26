import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {MessageType} from './components/Dialogs/Message/Message';
import {DialogType} from './components/Dialogs/Dialog/Dialog';
import {PostType} from './components/Profile/MyPosts/Post/Post';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const dialogs: DialogType[] = [
    {id: '1', name: 'Ivan'},
    {id: '2', name: 'Anna'},
    {id: '3', name: 'Melissa'},
    {id: '4', name: 'Kristina'},
    {id: '5', name: 'Vladimir'},
    {id: '6', name: 'Alexandra'},
];

const messages: MessageType[] = [
    {title: 'Hi!'},
    {title: 'My name is Ivan!'},
    {title: 'And you?'},
    {title: 'I am Fine'},
    {title: 'It s cool!'},
];

const posts: PostType[] = [
    {title: 'JavaScript is the best programming language', likeCount: 10},
    {title: 'JavaScript is the best programming language', likeCount: 10},
];

root.render(
    <BrowserRouter>
        <App messages={messages} dialogs={dialogs} posts={posts}/>
    </BrowserRouter>
);

