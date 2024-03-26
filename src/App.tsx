import React, {FC} from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from './components/Error404/Error404';
import {Users} from './components/Users/Users';
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {MessageType} from './components/Dialogs/Message/Message';
import {DialogType} from './components/Dialogs/Dialog/Dialog';
import {PostType} from './components/Profile/MyPosts/Post/Post';

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
    dialogs: DialogType[]
    messages: MessageType[]
    posts: PostType[]
}

const App: FC<AppType> = ({messages, dialogs, posts}) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path={'/'} element={<Navigate to={'profile'}/>}/>

                    <Route path={PATH.PAGE1} element={<Profile posts={posts}/>}/>
                    <Route path={PATH.PAGE2} element={<Dialogs messages={messages} dialogs={dialogs}/>}/>
                    <Route path={`${PATH.PAGE2}/:id`} element={<Dialogs messages={messages} dialogs={dialogs}/>}/>
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