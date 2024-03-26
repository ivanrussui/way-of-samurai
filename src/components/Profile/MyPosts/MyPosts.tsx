import React, {FC} from 'react';
import styles from './MyPosts.module.css';
import {Post, PostType} from './Post/Post';

type PropsType = {
    posts: PostType[]
}

export const MyPosts: FC<PropsType> = ({posts}) => {
    return (
        <div>
            <h3 className={styles.Title}>My posts</h3>
            <textarea/>
            <button className={styles.Btn}>SEND</button>
            <div className={styles.MyPosts}>
                {posts.map(el => <Post key={el.title} title={el.title} likeCount={el.likeCount}/>)}
            </div>
        </div>
    );
};

