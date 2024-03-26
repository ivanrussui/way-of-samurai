import React, {FC} from 'react';
import styles from './Post.module.css';
import avatar from '../../../../assets/post.jpg'

export type PostType = {
    title: string
    likeCount: number
}

export const Post: FC<PostType> = ({title, likeCount}) => {
    return (
        <div className={styles.MyPosts}>
            <img className={styles.Images} src={avatar} alt="post"/>
            <div className={styles.Text}>
                <span>{title}</span>
                <span>Like: {likeCount}</span>
            </div>
        </div>
    );
}

