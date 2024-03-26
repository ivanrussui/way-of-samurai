import React, {FC} from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostType} from './MyPosts/Post/Post';

type ProfileType = {
    posts: PostType[]
}

export const Profile: FC<ProfileType> = ({posts}) => {
    return (
        <>
            <ProfileInfo/>
            <MyPosts posts={posts}/>
        </>
    );
};