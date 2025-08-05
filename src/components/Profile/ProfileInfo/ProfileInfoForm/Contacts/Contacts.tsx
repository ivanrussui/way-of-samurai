import {ProfileInfoResponseType} from '../../../../../api/api';
import React, {FC} from 'react';
import styles from '../ProfileInfoForm.module.css';
import {CreateField} from '../../../../Common/CreateField/CreateField';

type ContactsPropsType = {
    isEdit: boolean
    profile: ProfileInfoResponseType
}
export const Contacts: FC<ContactsPropsType> = ({isEdit, profile}) => {
    const contactsData = [
        {href: profile.contacts.facebook, value: 'facebook'},
        {href: profile.contacts.github, value: 'github'},
        {href: profile.contacts.instagram, value: 'instagram'},
        {href: profile.contacts.mainLink, value: 'mainLink'},
        {href: profile.contacts.twitter, value: 'twitter'},
        {href: profile.contacts.vk, value: 'vk'},
        {href: profile.contacts.website, value: 'website'},
        {href: profile.contacts.youtube, value: 'youtube'},
    ];

    return (
        <>
            <h3 className={styles.Title}>Мои контакты</h3>
            <ul className={styles.Contacts}>
                {contactsData.map(({href, value}) =>
                    <li key={value}>
                        {isEdit ? (
                            <CreateField labelOn={false} name={`contacts.${value}`}/>
                        ) : href ? (
                            <a href={href} target="_blank" rel="noopener noreferrer">{value}</a>
                        ) : (
                            <span>{value}</span>
                        )}
                    </li>
                )}
            </ul>
        </>
    );
};