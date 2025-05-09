import React, {ComponentType} from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from './components/Error404/Error404';
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {AppRootStateType} from './state/store-redux';
import {Preloader} from './components/Common/Preloader/Preloader';
import {setInitializedTC} from './state/app-reducer';

export const PATH = {
    PAGE1: '/profile',
    PAGE2: '/dialogs',
    PAGE3: '/users',
    PAGE4: '/news',
    PAGE5: '/music',
    PAGE6: '/settings',
    PAGE404: '/error404',
    PAGE_LOGIN: '/login',
} as const;


type MapStateToPropsType = {
    isInitialized: boolean
}

type MapDispatchToPropsType = {
    setInitializedTC: () => void
}

type AppType = MapStateToPropsType & MapDispatchToPropsType


class App extends React.Component<AppType, {}>{
    componentDidMount() {
        this.props.setInitializedTC();
    }

    render() {

        if (!this.props.isInitialized) {
            return <Preloader />;
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path={'/'} element={<Navigate to={'profile'}/>}/>
                        <Route path={'/*'} element={<Navigate to={PATH.PAGE404}/>}/>
                        <Route path={`${PATH.PAGE1}/*`} element={<ProfileContainer/>}/>
                        <Route path={`${PATH.PAGE1}/:id?`} element={<ProfileContainer/>}/>
                        <Route path={PATH.PAGE2} element={<DialogsContainer/>}/>
                        <Route path={`${PATH.PAGE2}/:id`} element={<DialogsContainer/>}/>
                        <Route path={PATH.PAGE3} element={<UsersContainer/>}/>
                        <Route path={PATH.PAGE4} element={<News/>}/>
                        <Route path={PATH.PAGE5} element={<Music/>}/>
                        <Route path={PATH.PAGE6} element={<Settings/>}/>
                        <Route path={PATH.PAGE404} element={<Error404/>}/>
                        <Route path={PATH.PAGE_LOGIN} element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isInitialized: state.app.isInitialized,
});

export default compose<ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
    (mapStateToProps, {setInitializedTC})
)
(App);
