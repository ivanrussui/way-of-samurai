import React, {Component, ComponentType} from 'react';
// import {Login} from './Login';
import {loginTC, toggleIsFetchingLogin} from '../../state/auth-reducer';
import {AppRootStateType} from '../../state/store-redux';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {LoginParamsType} from '../../api/api';
import {Preloader} from '../Common/Preloader/Preloader';
// import {withLoggedRedirect} from '../../hoc/withLoggedRedirect';

type MapStateToPropsType = {
    isAuth: boolean
    isFetchingLogin: boolean
}

type MapDispatchToPropsType = {
    loginTC: (loginParams: LoginParamsType) => void
    toggleIsFetchingLogin: (value: boolean) => void
}

type LoginType = MapStateToPropsType & MapDispatchToPropsType

export const a = {}
//
// class LoginContainer extends Component<LoginType, {}> {
//     login(loginParams: LoginParamsType) {
//         this.props.loginTC(loginParams)
//     }
//
//     render() {
//         return <>
//             {/*{this.props.isAuth && <Navigate to={'/'}/>}*/}
//             {this.props.isFetchingLogin
//                 ? <Preloader/>
//                 : <Login {...this.props}/>
//             }
//         </>
//     }
// }
//
// const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
//     isAuth: state.auth.isAuth,
//     isFetchingLogin: state.auth.isFetchingLogin
// });
//
// export default compose<ComponentType>(
//     withLoggedRedirect,
//     connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
//     (mapStateToProps, {loginTC, toggleIsFetchingLogin})
// )
// (LoginContainer);