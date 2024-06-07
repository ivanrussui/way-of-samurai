import React from 'react';
import {addPostAC, changePostAC} from '../../../state/profile-reducer';
import {StoreContext} from '../../../state/store-context';
import {MyPosts} from './MyPosts';

export const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {store => {
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
                                changeTextPost={changeTextPost}/>;
            }}
        </StoreContext.Consumer>
    );
};
