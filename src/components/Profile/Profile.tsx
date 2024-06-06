import React, {FC} from 'react';
import styles from './Profile.module.css';
import bgImg from '../../assets/main-bg.jpg';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {Store} from 'redux';
import {AppRootStateType} from '../../state/store-redux';

type PropsType = {
    store: Store<AppRootStateType>
}

export const Profile: FC<PropsType> = ({store}) => {
    return (
        <>
            <img className={styles.Image} src={bgImg} alt="background"/>
            <MyPostsContainer store={store}/>
        </>
    );
};