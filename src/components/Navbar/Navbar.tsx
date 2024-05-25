import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {Friends} from '../Friends/Friends';
import React, {FC} from 'react';
import {ActionsTypes, SidebarType} from '../../types/types';

type PropsType = {
    sidebar: SidebarType
    dispatch: (action: ActionsTypes) => void
}

export const Navbar: FC<PropsType> = ({sidebar, dispatch}) => {
    return (
        <nav className={styles.Navbar}>
            <div>
                <NavLink
                    to="/profile"
                    className={({isActive}) =>
                        isActive ? `LinkActive` : `Link`
                    }>
                    Profile
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="/dialogs"
                    className={({isActive}) =>
                        isActive ? `LinkActive` : `Link`
                    }>
                    Dialogs
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="/users"
                    className={({isActive}) =>
                        isActive ? `LinkActive` : `Link`
                    }>
                    Users
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="/news"
                    className={({isActive}) =>
                        isActive ? `LinkActive` : `Link`
                    }>
                    News
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="/music"
                    className={({isActive}) =>
                        isActive ? `LinkActive` : `Link`
                    }>
                    Music
                </NavLink>
            </div>
            <div>
                <NavLink
                    to="/settings"
                    className={({isActive}) =>
                        isActive ? `LinkActive` : `Link`
                    }>
                    Settings
                </NavLink>
            </div>
            <Friends friends={sidebar.friends} dispatch={dispatch}/>
        </nav>
    );
};