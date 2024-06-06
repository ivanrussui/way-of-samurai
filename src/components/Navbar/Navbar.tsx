import styles from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import React, {FC} from 'react';
import {Store} from 'redux';
import {AppRootStateType} from '../../state/store-redux';
import {FriendsContainer} from '../Friends/FriendsContainer';

type PropsType = {
    store: Store<AppRootStateType>
}

export const Navbar: FC<PropsType> = ({store}) => {
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
            <FriendsContainer store={store}/>
        </nav>
    );
};