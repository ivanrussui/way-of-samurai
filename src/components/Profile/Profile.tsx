import React, {FC} from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostType} from '../../types/types';

type PropsType = {
    posts: PostType[]
    value: string
    addPost: () => void
    changeTextarea: (value: string) => void
}

export const Profile: FC<PropsType> = ({posts, addPost, changeTextarea, value}) => {
    return (
        <>
            <ProfileInfo/>
            <MyPosts posts={posts} addPost={addPost} value={value} changeTextarea={changeTextarea}/>
        </>
    );
};