import React from 'react';
import styles from './Profile.module.css';
import bgImg from '../../assets/main-bg.jpg';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

export const Profile = () => {
    return (
        <>
            <img className={styles.Image} src={bgImg} alt="background"/>
            <MyPostsContainer/>
        </>
    );
};