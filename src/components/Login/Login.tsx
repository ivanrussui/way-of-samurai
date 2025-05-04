import React from 'react';
import {loginTC, toggleIsFetchingLogin} from '../../state/auth-reducer';
import {AppRootStateType} from '../../state/store-redux';
import {connect, ConnectedProps} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {Preloader} from '../Common/Preloader/Preloader';
import {LoginForm} from './LoginForm/LoginForm';


const Login = ({isAuth, isFetchingLogin, loginTC, toggleIsFetchingLogin}: PropsFromRedux) => {
    // const dispatch = useAppDispatch();
    // const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    // const isFetchingLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isFetchingLogin)

    if (isAuth) {
        return <Navigate to={'/'}/>;
    }

    return (
        <>
            <h2 style={{color: 'var(--fourth-color)'}}>Login</h2>
            <LoginForm loginTC={loginTC} toggleIsFetchingLogin={toggleIsFetchingLogin}/>
            {isFetchingLogin && <Preloader position={'left'} width={'150px'}/>}
        </>
    );
};

type MapStateToPropsType = {
    isAuth: boolean
    isFetchingLogin: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    isFetchingLogin: state.auth.isFetchingLogin,
});

type PropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps, {loginTC, toggleIsFetchingLogin});
export default connector(Login);
