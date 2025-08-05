import {ContactsType, ProfileInfoResponseType, ProfileInfoUpdateType} from '../../../../api/api';
import React, {FC, useState} from 'react';
import {Form, Formik} from 'formik';
import {Preloader} from '../../../Common/Preloader/Preloader';
import {Contacts} from './Contacts/Contacts';
import {AboutMe} from './AboutMe/AboutMe';

type AboutMeType = {
    'Моё имя': string
    'О себе': string
    'Мой стек': string
}

type ProfileFormValuesType = {
    aboutMe: AboutMeType
    contacts: ContactsType
    lookingForAJob: boolean
}

type ProfileInfoFormPropsType = {
    profile: ProfileInfoResponseType | null
    isOwner: boolean
    updateProfileTC: (profile: ProfileInfoUpdateType) => void
}

export const ProfileInfoForm: FC<ProfileInfoFormPropsType> = ({profile, isOwner, updateProfileTC}) => {
    const [isEdit, setIsEdit] = useState(false);

    if (!profile) {
        return <Preloader/>;
    }

    const initialValues: ProfileFormValuesType = {
        aboutMe: {
            'Моё имя': profile.fullName,
            'О себе': profile.aboutMe,
            'Мой стек': profile.lookingForAJobDescription,
        },
        contacts: {
            facebook: profile.contacts.facebook,
            github: profile.contacts.github,
            instagram: profile.contacts.instagram,
            mainLink: profile.contacts.mainLink,
            twitter: profile.contacts.twitter,
            vk: profile.contacts.vk,
            website: profile.contacts.website,
            youtube: profile.contacts.youtube,
        },
        lookingForAJob: profile.lookingForAJob,
    };

    const handleSubmit = (values: ProfileFormValuesType) => {
        if (isEdit) {
            const profileUpdated = {
                userId: profile.userId,
                aboutMe: values.aboutMe['О себе'],
                fullName: values.aboutMe['Моё имя'],
                lookingForAJob: values.lookingForAJob,
                lookingForAJobDescription: values.aboutMe['Мой стек'],
                contacts: values.contacts,
            };
            updateProfileTC(profileUpdated);
        }
        setIsEdit(!isEdit);
    };

    return (
        <Formik<ProfileFormValuesType> initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                <AboutMe isOwner={isOwner} isEdit={isEdit} profile={profile}/>
                <Contacts isEdit={isEdit} profile={profile}/>
            </Form>
        </Formik>
    );
};
