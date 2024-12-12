import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {AppRootStateType} from '../../../state/store-redux';
import {setProfile} from '../../../state/profile-reducer';
import {toggleIsFetching} from '../../../state/users-reducer';
import {ProfileInfo} from './ProfileInfo';

type MapStateToPropsType = {
    profile: ProfileInfoResponseType | null
}

type MapDispatchToPropsType = {
    setProfile: (profile: ProfileInfoResponseType) => void
    toggleIsFetching: (isFetching: boolean) => void
}

export type ProfileInfoPropsType = MapStateToPropsType & MapDispatchToPropsType

export type ProfileInfoResponseType = {
    userId: number
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: {
        facebook: string
        github: string
        instagram: string
        mainLink: string
        twitter: string
        vk: string
        website: string
        youtube: string
    }
    photos: {
        large: string
        small: string
    }
}

class ProfileInfoContainer extends Component<ProfileInfoPropsType, any> {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get<ProfileInfoResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setProfile(response.data);
                this.props.toggleIsFetching(false);
            });
    }


    render() {
        return (
            <ProfileInfo profile={this.props.profile}/>
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profileInfo
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
(mapStateToProps, {setProfile, toggleIsFetching})(ProfileInfoContainer);