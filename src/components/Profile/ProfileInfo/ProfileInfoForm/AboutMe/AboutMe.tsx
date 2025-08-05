import React, {FC} from 'react';
import {ImageSmile} from './ImageSmile/ImageSmile';
import styles from '../ProfileInfoForm.module.css';
import {Button} from '../../../../Common/Button/Button';
import {CheckboxCustom} from '../../../../Common/CheckboxCustom/CheckboxCustom';
import {CreateField} from '../../../../Common/CreateField/CreateField';
import {ProfileInfoResponseType} from '../../../../../api/api';

type AboutMePropsType = {
    isOwner: boolean
    isEdit: boolean
    profile: ProfileInfoResponseType
}
export const AboutMe: FC<AboutMePropsType> = ({isOwner, isEdit, profile}) => {
    const aboutMeData = [
        {label: 'Моё имя', value: profile.fullName},
        {label: 'О себе', value: profile.aboutMe},
        {label: 'Мой стек', value: profile.lookingForAJobDescription},
        {label: 'В поиске работы', value: <ImageSmile lookingForAJob={profile.lookingForAJob}/>},
    ];

    return (
        <>
            <h3 className={styles.Title}>Обо мне</h3>
            {isOwner && <Button name={`${isEdit ? 'Сохранить' : 'Редактировать'} информацию`} type={'submit'}/>}

            <ul className={styles.AboutMe}>
                {aboutMeData.map(({label, value}) => {
                    if (label === 'В поиске работы') {
                        return (
                            <li key={label} className={styles.ListSmile}>
                                <b>{label}: </b>
                                {isEdit ? (
                                    // При редактировании показываем кастомный чекбокс
                                    <div className={styles.WrapperCheckbox}>
                                        <CheckboxCustom name="lookingForAJob"/>
                                    </div>
                                ) : (
                                    // Иначе показываем картинку
                                    <ImageSmile lookingForAJob={profile.lookingForAJob}/>
                                )}
                            </li>
                        );
                    }

                    // Для остальных полей стандартный рендер
                    return (
                        <li key={label}>
                            <b>{label}: </b>
                            {isEdit
                                ? <CreateField labelOn={false} name={`aboutMe.${label}`}/>
                                : <span>{value}</span>
                            }
                        </li>
                    );
                })}
            </ul>
        </>
    );
};