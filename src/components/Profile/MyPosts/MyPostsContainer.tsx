import React, {FC} from 'react';
import {addPostAC, changePostAC} from '../../../state/profile-reducer';
import {MyPosts} from './MyPosts';
import {Store} from 'redux';
import {AppRootStateType} from '../../../state/store-redux';

type PropsType = {
    store: Store<AppRootStateType>
}

export const MyPostsContainer: FC<PropsType> = ({store}) => {
    const state = store.getState();

    const addPost = () => {
        store.dispatch(addPostAC());
    };

    const changeTextPost = (text: string) => {
        store.dispatch(changePostAC(text));
    };

    return <MyPosts posts={state.profilePage.posts}
                    value={state.profilePage.value}
                    addPost={addPost}
                    changeTextPost={changeTextPost}
    />;
};
