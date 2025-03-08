import {ResponseType} from '../api/api';
import {Dispatch} from 'redux';
import {ActionsUsersTypes} from '../state/users-reducer';

type ToggleFollowUserParams = {
    userId: number;
    followed: boolean;
    methodAPI: (userId: number) => Promise<ResponseType>;
    followUnfollow: (userId: number, bool: boolean) => ActionsUsersTypes;
    toggleIsFetchingUser: (userId: number, bool: boolean) => ActionsUsersTypes;
    dispatch: (Dispatch<ActionsUsersTypes>)
};

export const toggleFollowUser = ({userId, followed, dispatch, methodAPI, followUnfollow, toggleIsFetchingUser}: ToggleFollowUserParams) => {
    return methodAPI(userId)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(followUnfollow(userId, followed));
            }
            dispatch(toggleIsFetchingUser(userId, false));
        });
};
