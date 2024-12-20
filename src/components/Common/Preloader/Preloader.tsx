import React from 'react';
import preloader from '../../../assets/spinner.svg';

export const Preloader = ({width = '500px', position = 'center'}) => {
    const style = {
        width: width,
        margin: position === 'left' ? '0 auto 0 0' : position === 'right' ? '0 0 0 auto' : '0 auto',
        display: 'block',
    };

    return <img src={preloader} alt="Preloader" style={style}/>;
};

