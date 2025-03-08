import React, {Component, ComponentType} from 'react';
import {AppRootStateType} from '../../state/store-redux';
import {connect} from 'react-redux';
import {Profile} from './Profile';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

class ProfileContainer extends Component<{}, {}> {
    render() {
        return <Profile/>;
    }
}

// export default withAuthRedirect(connect<{}, {}, {}, AppRootStateType>(null)(ProfileContainer));

export default compose<ComponentType>(
    // withAuthRedirect,
    connect<{}, {}, {}, AppRootStateType>(null),
)
(ProfileContainer);

//-------------------------------------
// type MapStateToPropsType = {
//     isAuth: boolean
// }
// type OwnPropsType = MapStateToPropsType & {}
//
// class ProfileContainer extends Component<OwnPropsType, {}> {
//     render() {
//         return <Profile/>;
//     }
//
// }
//
// const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
//     isAuth: state.auth.isAuth
// });
//
// export default withAuthRedirect(connect<MapStateToPropsType, {}, {}, AppRootStateType>(mapStateToProps, {})(ProfileContainer));
