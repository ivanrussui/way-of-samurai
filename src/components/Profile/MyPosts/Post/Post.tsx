import React, {FC} from 'react';
import styles from './Post.module.css';
import avatar from '../../../../assets/post.jpg';
import {Button} from '../../../Common/Button/Button';

type PropsType = {
    title: string
    likeCount: number
    id: string
    deletePost: (id: string) => void
}

export const Post: FC<PropsType> = ({title, likeCount, deletePost, id}) => {
    return (
        <div className={styles.MyPosts}>
            <img className={styles.Images} src={avatar} alt="post"/>
                <div className={styles.Text}>
                    <span>{title}</span>
                    <span>Like: {likeCount}</span>
                </div>
                <Button name={'Delete Post'} onClick={() => deletePost(id)}/>
        </div>
    );
};

