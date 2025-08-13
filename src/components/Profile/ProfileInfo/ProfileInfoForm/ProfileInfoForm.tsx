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
    updateProfileTC: (profile: ProfileInfoUpdateType) => Promise<Record<string, string> | undefined>
    fieldErrors: Record<string, string> | null
}

export const ProfileInfoForm: FC<ProfileInfoFormPropsType> = ({profile, isOwner, ...props}) => {
    const {updateProfileTC} = props;

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

    const handleSubmit = async (values: ProfileFormValuesType) => {
        if (!isEdit) {
            setIsEdit(true);
        }

        if (isEdit) {
            const profileUpdated = {
                userId: profile.userId,
                aboutMe: values.aboutMe['О себе'],
                fullName: values.aboutMe['Моё имя'],
                lookingForAJob: values.lookingForAJob,
                lookingForAJobDescription: values.aboutMe['Мой стек'],
                contacts: values.contacts,
            };
            const res = await updateProfileTC(profileUpdated);
            if (!res) {
                setIsEdit(false);
            }
        }
    };

    return (
        <Formik<ProfileFormValuesType> initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
                <AboutMe isOwner={isOwner} isEdit={isEdit} profile={profile} fieldErrors={props.fieldErrors}/>
                <Contacts isEdit={isEdit} profile={profile} fieldErrors={props.fieldErrors}/>
            </Form>
        </Formik>
    );
};
