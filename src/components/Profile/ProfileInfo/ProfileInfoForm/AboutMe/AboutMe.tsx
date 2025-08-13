import React, {FC} from 'react';
import {ImageSmile} from './ImageSmile/ImageSmile';
import styles from '../ProfileInfoForm.module.css';
import {Button} from '../../../../Common/Button/Button';
import {CheckboxCustom} from '../../../../Common/CheckboxCustom/CheckboxCustom';
import {CreateField} from '../../../../Common/CreateField/CreateField';
import {ProfileInfoResponseType} from '../../../../../api/api';
import {Error} from '../../../../Common/Error/Error';

type AboutMePropsType = {
    isOwner: boolean
    isEdit: boolean
    profile: ProfileInfoResponseType
    fieldErrors: Record<string, string> | null
}
export const AboutMe: FC<AboutMePropsType> = ({isOwner, isEdit, profile, ...props}) => {

    const aboutMeData = [
        {label: 'Моё имя', value: profile.fullName, fieldName: 'fullname'},
        {label: 'О себе', value: profile.aboutMe, fieldName: 'aboutme'},
        {label: 'Мой стек', value: profile.lookingForAJobDescription, fieldName: 'lookingforajobdescription'},
        {
            label: 'В поиске работы', value: <ImageSmile lookingForAJob={profile.lookingForAJob}/>,
            fieldName: 'lookingForAJob'
        },
    ];

    return (
        <>
            <h3 className={styles.Title}>Обо мне</h3>
            {isOwner && <Button name={`${isEdit ? 'Сохранить' : 'Редактировать'} информацию`} type={'submit'}/>}

            <ul className={styles.AboutMe}>
                {aboutMeData.map(({label, value, fieldName}) => {
                    const fieldKey = `aboutMe.${fieldName}`;
                    const fieldError = props.fieldErrors?.[fieldKey];

                    if (label === 'В поиске работы') {
                        return (
                            <li key={fieldName} className={styles.ListSmile}>
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
                        <li key={fieldName}>
                            <b>{label}: </b>
                            {isEdit ? (
                                <>
                                    <CreateField labelOn={false} name={`aboutMe.${label}`}/>
                                    {fieldError && <Error error={fieldError}/>}
                                </>
                            ) : (
                                <span>{value}</span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};