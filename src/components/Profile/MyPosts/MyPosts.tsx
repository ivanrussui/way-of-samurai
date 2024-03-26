import React, {FC} from 'react';
import styles from './MyPosts.module.css';
import {Post} from './Post/Post';

type PostsType = {
    id: number
    title: string
    likeCount: number
}

export const MyPosts: FC = () => {
    const posts: PostsType[] = [
        {id: 1, title: 'JavaScript is the best programming language', likeCount: 10},
        {id: 2, title: 'JavaScript is the best programming language', likeCount: 10},
    ];

    return (
        <div>
            <h3 className={styles.Title}>My posts</h3>
            <textarea/>
            <button className={styles.Btn}>SEND</button>
            <div className={styles.MyPosts}>
                {posts.map(el => <Post key={el.id} title={el.title} likeCount={el.likeCount}/>)}
            </div>
        </div>
    );
};

