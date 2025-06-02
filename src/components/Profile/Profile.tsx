import React, {FC} from 'react';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer';

export const Profile: FC = () => {
    return (
        <>
            <ProfileInfoContainer/>
            <MyPostsContainer/>
        </>
    );
};
