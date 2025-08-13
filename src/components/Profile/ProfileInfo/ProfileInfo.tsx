import React, {ChangeEvent, FC} from 'react';
import styles from './ProfileInfo.module.css';
import {Preloader} from '../../Common/Preloader/Preloader';
import plug from '../../../assets/plug.png';
import {ProfileInfoResponseType, ProfileInfoUpdateType} from '../../../api/api';
import {ProfileInfoForm} from './ProfileInfoForm/ProfileInfoForm';

type ProfileInfoPropsType = {
    profile: ProfileInfoResponseType | null
    isOwner: boolean
    updatePhotoTC: (file: File) => void
    updateProfileTC: (profile: ProfileInfoUpdateType) => Promise<Record<string, string> | undefined>
    fieldErrors: Record<string, string> | null
}

export const ProfileInfo: FC<ProfileInfoPropsType> = ({profile, isOwner, ...props}) => {
    const {updatePhotoTC, updateProfileTC} = props;

    const updatePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            updatePhotoTC(e.currentTarget.files[0]);
        }
    };

    if (!profile) {
        return <Preloader/>;
    }

    return (
        <div className={styles.ProfileInfo}>
            <div><img className={styles.Image} src={profile.photos.large || plug} alt="avatar"/></div>
            {isOwner && <input type="file" onChange={updatePhotoHandler}/>}
            <ProfileInfoForm key={profile.userId} profile={profile} isOwner={isOwner}
                             updateProfileTC={updateProfileTC} fieldErrors={props.fieldErrors}/>
        </div>
    );
};
