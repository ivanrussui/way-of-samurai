import React, {FC} from 'react';
import styles from './ProfileInfo.module.css';
import bgImg from '../../../assets/main-bg.jpg';

export const ProfileInfo: FC = () => <img className={styles.Image} src={bgImg} alt="background-image"/>;