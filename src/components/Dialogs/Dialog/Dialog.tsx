import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../../App';

export type DialogType = {
    id: string
    name: string
}

export const Dialog: FC<DialogType> = ({id, name}) => {
    return (
        <div>
            <NavLink to={`${PATH.PAGE2}${id}`}
                     className={({isActive}) =>
                         isActive ? `LinkActive` : `Link`
                     }>{name}
            </NavLink>
        </div>
    );
};