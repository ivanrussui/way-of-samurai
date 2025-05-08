import React from 'react';
import {setError, loginTC, toggleIsFetchingLogin} from '../../state/auth-reducer';
import {AppRootStateType} from '../../state/store-redux';
import {connect, ConnectedProps} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {Preloader} from '../Common/Preloader/Preloader';
import {LoginForm} from './LoginForm/LoginForm';


const Login = ({isAuth, isFetchingLogin, ...props}: PropsFromRedux) => {

    if (isAuth) {
        return <Navigate to={'/'}/>;
    }

    return (
        <>
            <h2 style={{color: 'var(--fourth-color)'}}>Login</h2>
            <LoginForm {...props}/>
            {isFetchingLogin && <Preloader position={'left'} width={'150px'}/>}
        </>
    );
};

type MapStateToPropsType = {
    isAuth: boolean
    isFetchingLogin: boolean
    captcha: null | string
    error: null | string
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    isFetchingLogin: state.auth.isFetchingLogin,
    captcha: state.auth.captcha,
    error: state.auth.error,
});

type PropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps, {loginTC, toggleIsFetchingLogin, setError});
export default connector(Login);
