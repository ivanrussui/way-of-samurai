import React, {FC} from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ActionsTypes, PostType} from '../../types/types';
import styles from './Profile.module.css';
import bgImg from '../../assets/main-bg.jpg';

type PropsType = {
    posts: PostType[]
    value: string
    dispatch: (action: ActionsTypes) => void
}

export const Profile: FC<PropsType> = ({posts, value, dispatch}) => {
    return (
        <>
            <img className={styles.Image} src={bgImg} alt="background"/>
            <MyPosts posts={posts} value={value} dispatch={dispatch}/>
        </>
    );
};