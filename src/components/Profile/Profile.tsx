import React, {FC} from 'react';
import styles from './Profile.module.css';
import bgImg from '../../assets/main-bg.jpg';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer';

export const Profile: FC = () => {
    return (
        <>
            {/*<img className={styles.Image} src={bgImg} alt="background"/>*/}
            <ProfileInfoContainer/>
            <MyPostsContainer/>
        </>
    );
};
