import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from './components/Error404/Error404';
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';

export const PATH = {
    PAGE1: '/profile',
    PAGE2: '/dialogs',
    PAGE3: '/users',
    PAGE4: '/news',
    PAGE5: '/music',
    PAGE6: '/settings',
    PAGE404: '/error404',
} as const;

const App = () => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path={'/'} element={<Navigate to={'profile'}/>}/>

                    <Route path={PATH.PAGE1} element={<Profile/>}/>
                    <Route path={PATH.PAGE2} element={<DialogsContainer/>}/>
                    <Route path={`${PATH.PAGE2}/:id`} element={<DialogsContainer/>}/>
                    <Route path={PATH.PAGE3} element={<UsersContainer/>}/>
                    <Route path={PATH.PAGE4} element={<News/>}/>
                    <Route path={PATH.PAGE5} element={<Music/>}/>
                    <Route path={PATH.PAGE6} element={<Settings/>}/>

                    <Route path={PATH.PAGE404} element={<Error404/>}/>
                    <Route path={'/*'} element={<Navigate to={PATH.PAGE404}/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default App;