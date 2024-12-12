import React, {FC} from 'react';
import styles from './ProfileInfo.module.css';
import smile from '../../../assets/smile.png';
import badSmile from '../../../assets/badSmile.png';
import {Preloader} from '../../Common/Preloader/Preloader';
import {ProfileInfoResponseType} from './ProfileInfoContainer';

type ProfileInfoPropsType = {
    profile: ProfileInfoResponseType | null
}

export const ProfileInfo: FC<ProfileInfoPropsType> = (props) => {
    if (!props.profile) {
        return <Preloader/>;
    }

    return (
        <>
            <ul className={styles.AboutMe}>
                <li><img src={props.profile.photos.small} alt="avatar"/></li>
                <li><h3 className={styles.Title}>Обо мне</h3></li>
                <li>Моё имя: {props.profile.fullName}</li>
                <li>О Себе: {props.profile.aboutMe}</li>
                <li>
                    <span>В поиске работы:</span>
                    <img className={styles.Smile} src={props.profile.lookingForAJob ? smile : badSmile} alt="smile"/>
                </li>
                <li> Описание поиска работы: {props.profile.lookingForAJobDescription}</li>
            </ul>

            <ul className={styles.Contacts}>
                <li><h3 className={styles.Title}>Мои контакты</h3></li>
                <li><a href={props.profile.contacts.github}>github</a></li>
                <li><a href={props.profile.contacts.vk}>vk</a></li>
                <li><a href={props.profile.contacts.instagram}>instagram</a></li>
                <li><a href={props.profile.contacts.facebook}>facebook</a></li>
                <li><a href={props.profile.contacts.twitter}>twitter</a></li>
                <li><a href={props.profile.contacts.website}>website</a></li>
            </ul>
        </>
    );
};
