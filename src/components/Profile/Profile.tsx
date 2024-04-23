import React, {FC} from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostType} from '../../types/types';

type PropsType = {
    posts: PostType[]
    addPost: (title: string) => void
}

export const Profile: FC<PropsType> = ({posts, addPost}) => {
    return (
        <>
            <ProfileInfo/>
            <MyPosts posts={posts} addPost={addPost}/>
        </>
    );
};