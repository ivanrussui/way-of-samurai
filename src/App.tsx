import React, {ComponentType, lazy} from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from './components/Error404/Error404';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {AppRootStateType} from './state/store-redux';
import {Preloader} from './components/Common/Preloader/Preloader';
import {setInitializedTC} from './state/app-reducer';
import {withSuspense} from './hoc/withSuspense';
import {SuspenseWrapper} from './components/Common/SuspenseWrapper/SuspenseWrapper';
import {setError} from './state/auth-reducer';
import {GlobalError} from './components/Common/GlobalError/GlobalError';

// специально не все обернул в lazy()
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const News = lazy(() => import('./components/News/News'));
const Music = lazy(() => import('./components/Music/Music'));
const Settings = lazy(() => import('./components/Settings/Settings'));

// специально не все HOC withSuspense
const SuspendedProfileContainer = withSuspense(ProfileContainer);
const SuspendedDialogsContainer = withSuspense(DialogsContainer);

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
    setError: (error: string | null) => void

}

type AppType = MapStateToPropsType & MapDispatchToPropsType


class App extends React.Component<AppType, {}> {
    componentDidMount() {
        this.props.setInitializedTC();
    }

    render() {

        if (!this.props.isInitialized) {
            return <Preloader/>;
        }
        return (
            <div className="app-wrapper">
                <GlobalError/>
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    {/* <Suspense fallback={<Preloader/>}> 1 раз все оборачиваешь и не нужны HOC и др обертки */}
                    <Routes>
                        <Route path={'/'} element={<Navigate to={'profile'}/>}/>
                        <Route path={'/*'} element={<Navigate to={PATH.PAGE404}/>}/>

                        {/*HOC withSuspense*/}
                        <Route path={`${PATH.PAGE1}/*`} element={<SuspendedProfileContainer/>}/>
                        <Route path={`${PATH.PAGE1}/:id?`} element={<SuspendedProfileContainer/>}/>
                        <Route path={PATH.PAGE2} element={<SuspendedDialogsContainer/>}/>
                        <Route path={`${PATH.PAGE2}/:id`} element={<SuspendedDialogsContainer/>}/>

                        {/*SuspenseWrapper*/}
                        <Route path={PATH.PAGE3} element={<SuspenseWrapper><UsersContainer/></SuspenseWrapper>}/>
                        <Route path={PATH.PAGE4} element={<SuspenseWrapper><News/></SuspenseWrapper>}/>
                        <Route path={PATH.PAGE5} element={<SuspenseWrapper><Music/></SuspenseWrapper>}/>
                        <Route path={PATH.PAGE6} element={<SuspenseWrapper><Settings/></SuspenseWrapper>}/>

                        <Route path={PATH.PAGE_LOGIN} element={<Login/>}/>
                        <Route path={PATH.PAGE404} element={<Error404/>}/>
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
    (mapStateToProps, {setInitializedTC, setError})
)
(App);
