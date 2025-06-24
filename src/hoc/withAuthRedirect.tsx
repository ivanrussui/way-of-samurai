import React, {ComponentType} from 'react';
import {Navigate} from 'react-router-dom';
import {PATH} from '../App';
import {connect} from 'react-redux';
import {AppRootStateType} from '../state/store-redux';

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = <T, >(WrappedComponent: ComponentType<T>) => {
    const HOC = (props: MapStateToPropsType) => {
        const {isAuth, ...restProps} = props;

        return isAuth
            ? <WrappedComponent {...restProps as T & {}}/>
            : <Navigate to={PATH.PAGE_LOGIN}/>;
    };

    return connect(mapStateToProps)(HOC);
};
