import {ProfileInfoResponseType} from '../../../../../api/api';
import React, {FC} from 'react';
import styles from '../ProfileInfoForm.module.css';
import {CreateField} from '../../../../Common/CreateField/CreateField';
import {Error} from '../../../../Common/Error/Error';

type ContactsPropsType = {
    isEdit: boolean
    profile: ProfileInfoResponseType
    fieldErrors: Record<string, string> | null
}

export const Contacts: FC<ContactsPropsType> = ({isEdit, profile, fieldErrors}) => {

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
                {contactsData.map(({href, value}) => {
                        const fieldKey = `contacts.${value.toLowerCase()}`;
                        const fieldError = fieldErrors?.[fieldKey];

                        return <li key={value}>
                            <b>{value}: </b>
                            {isEdit ? (
                                <>
                                    <CreateField labelOn={false} name={`contacts.${value}`}/>
                                    {fieldError && <Error error={fieldError}/>}
                                </>
                            ) : href ? (
                                <a href={href} target="_blank" rel="noopener noreferrer">{value}</a>
                            ) : (
                                <span>{`No ${value}`}</span>
                            )}
                        </li>;
                    }
                )}
            </ul>
        </>
    );
};