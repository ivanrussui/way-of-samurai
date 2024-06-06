import React, {FC} from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from './components/Error404/Error404';
import {Users} from './components/Users/Users';
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {AppRootStateType} from './state/store-redux';
import {Store} from 'redux';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';

export const PATH = {
    PAGE1: '/profile',
    PAGE2: '/dialogs',
    PAGE3: '/users',
    PAGE4: '/news',
    PAGE5: '/music',
    PAGE6: '/settings',
    PAGE404: '/error404',
} as const;

type AppType = {
    store: Store<AppRootStateType>
}

const App: FC<AppType> = ({store}: AppType) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar store={store}/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path={'/'} element={<Navigate to={'profile'}/>}/>

                    <Route path={PATH.PAGE1} element={<Profile store={store}/>}/>
                    <Route path={PATH.PAGE2} element={<DialogsContainer store={store}/>}/>
                    <Route path={`${PATH.PAGE2}/:id`} element={<DialogsContainer store={store}/>}/>
                    <Route path={PATH.PAGE3} element={<Users/>}/>
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