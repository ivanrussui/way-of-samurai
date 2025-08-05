import React, {ChangeEvent, FC} from 'react';
import styles from './ProfileInfo.module.css';
import smile from '../../../assets/smile.png';
import sadSmile from '../../../assets/sadSmile.png';
import {Preloader} from '../../Common/Preloader/Preloader';
import plug from '../../../assets/plug.png';
import {ProfileInfoResponseType} from '../../../api/api';

type ProfileInfoPropsType = {
    profile: ProfileInfoResponseType | null
    isOwner: boolean
    updatePhotoTC: (file: File) => void
}

export const ProfileInfo: FC<ProfileInfoPropsType> = ({profile, isOwner, updatePhotoTC}) => {
    if (!profile) {
        return <Preloader/>;
    }

    const aboutMeData = [
        {label: 'Моё имя', value: profile.fullName},
        {label: 'О себе', value: profile.aboutMe},
        {
            label: 'В поиске работы',
            value: (
                <img
                    className={styles.Smile}
                    src={profile.lookingForAJob ? smile : sadSmile}
                    alt={profile.lookingForAJob ? 'улыбка' : 'грустное лицо'}
                />
            )
        },
        {label: 'Описание поиска работы', value: profile.lookingForAJobDescription}
    ];

    const contactsData = [
        {href: profile.contacts.github, value: 'github'},
        {href: profile.contacts.vk, value: 'vk'},
        {href: profile.contacts.instagram, value: 'instagram'},
        {href: profile.contacts.facebook, value: 'facebook'},
        {href: profile.contacts.website, value: 'website'},
    ];

    const updatePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            updatePhotoTC(e.currentTarget.files[0]);
        }
    };

    return (
        <>
            <div className={styles.ProfileInfo}>
                <div><img className={styles.Image} src={profile.photos.large || plug} alt="avatar"/></div>
                {isOwner && <input type="file" onChange={updatePhotoHandler}/>}
                <h3 className={styles.Title}>Обо мне</h3>
                <ul className={styles.AboutMe}>
                    {aboutMeData.map(({label, value}) => {
                        return <li key={label}><span>{label}: </span>{value}</li>;
                    })}
                </ul>

                <h3 className={styles.Title}>Мои контакты</h3>
                <ul className={styles.Contacts}>
                    {contactsData.map(({href, value}) =>
                        href ? (
                            <li key={value}>
                                <a href={href} target="_blank" rel="noopener noreferrer">{value}</a>
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
        </>
    );
};
