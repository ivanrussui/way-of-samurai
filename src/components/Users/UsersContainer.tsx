import {Users} from './Users';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../state/store-redux';
import {Dispatch} from 'redux';
import {followUnfollowAC, setUsersAC, UserType} from '../../state/users-reducer';

type MapStateToPropsType = {
    users: UserType[]
}

type MapDispatchToPropsType = {
    followUnfollow: (useId: number, followed: boolean) => void
    setUsers: (users: UserType[]) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users
    };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        followUnfollow: (useId: number, followed: boolean) => {
            dispatch(followUnfollowAC(useId, followed));
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users));
        }
    };
};

export const UsersContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(Users);