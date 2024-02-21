import React, {FC} from 'react';
import styles from './Profile.module.css';
import bgImg from '../../assets/main-bg.jpg';
import {MyPosts} from './MyPosts/MyPosts';

export const Profile: FC = () => {
    return (
        <div>
            <img className={styles.Image} src={bgImg} alt="background-image"/>
            <textarea/>
            <button className={styles.Btn}>SEND</button>
            <MyPosts title={'JavaScript is the best programming language'} likeCount={10}/>
            <MyPosts title={'TypeScript is the best Javascript dialect'} likeCount={15}/>
        </div>
    );
}