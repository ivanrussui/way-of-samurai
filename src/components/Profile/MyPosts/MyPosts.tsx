import React, {FC} from 'react';
import styles from './MyPosts.module.css';
import {Post} from './Post/Post';



export const MyPosts: FC = () => {
    return (
        <div>
            <h3 className={styles.Title}>My posts</h3>
            <textarea/>
            <button className={styles.Btn}>SEND</button>
            <div className={styles.MyPosts}>
                <Post title={'JavaScript is the best programming language'}  likeCount={10}/>
                <Post title={'TypeScript is the best Javascript dialect'}  likeCount={15}/>
            </div>
        </div>
    );
};

