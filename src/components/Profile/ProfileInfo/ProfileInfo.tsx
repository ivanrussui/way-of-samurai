import React, {FC} from 'react';
import styles from './ProfileInfo.module.css';
import smile from '../../../assets/smile.png';
import sadSmile from '../../../assets/sadSmile.png';
import {Preloader} from '../../Common/Preloader/Preloader';
import plug from '../../../assets/plug.png';
import {ProfileInfoResponseType} from '../../../api/api';

type ProfileInfoPropsType = {
    profile: ProfileInfoResponseType | null
}

export const ProfileInfo: FC<ProfileInfoPropsType> = (props) => {
    if (!props.profile) {
        return <Preloader/>;
    }

    const aboutMeData = [
        {label: 'Моё имя', value: props.profile.fullName},
        {label: 'О себе', value: props.profile.aboutMe},
        {
            label: 'В поиске работы',
            value: (
                <img
                    className={styles.Smile}
                    src={props.profile.lookingForAJob ? smile : sadSmile}
                    alt={props.profile.lookingForAJob ? 'улыбка' : 'грустное лицо'}
                />
            )
        },
        {label: 'Описание поиска работы', value: props.profile.lookingForAJobDescription}
    ];

    const contactsData = [
        {href: props.profile.contacts.github, value: 'github'},
        {href: props.profile.contacts.vk, value: 'vk'},
        {href: props.profile.contacts.instagram, value: 'instagram'},
        {href: props.profile.contacts.facebook, value: 'facebook'},
        {href: props.profile.contacts.website, value: 'website'},
    ];

    return (
        <>
            <div className={styles.ProfileInfo}>
                <div><img className={styles.Image} src={props.profile.photos.large || plug} alt="avatar"/></div>
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
