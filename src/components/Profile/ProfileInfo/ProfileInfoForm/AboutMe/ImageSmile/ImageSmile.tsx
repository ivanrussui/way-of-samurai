import smile from '../../../../../../assets/smile.png';
import sadSmile from '../../../../../../assets/sadSmile.png';
import React, {FC} from 'react';
import styles from '../../ProfileInfoForm.module.css';

type ImageSmilePropsType = {
    lookingForAJob: boolean
}

export const ImageSmile: FC<ImageSmilePropsType> = ({lookingForAJob}) => {
    return <img
        className={styles.Smile}
        src={lookingForAJob ? smile : sadSmile}
        alt={lookingForAJob ? 'улыбка' : 'грустное лицо'}
    />;
};