import {AppRootStateType} from './store-redux';

export const getItems = (state: AppRootStateType) => {
    return state.usersPage.users.items;
}

export const getTotalCount = (state: AppRootStateType) => {
    return state.usersPage.users.totalCount;
}

export const getPage = (state: AppRootStateType) => {
    return state.usersPage.page;
}

export const getCount = (state: AppRootStateType) => {
    return state.usersPage.count;
}

export const getIsFetching = (state: AppRootStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppRootStateType) => {
    return state.usersPage.followingInProgress;
}