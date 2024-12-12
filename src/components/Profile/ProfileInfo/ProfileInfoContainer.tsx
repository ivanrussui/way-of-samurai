import React, {Component, ComponentType} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {AppRootStateType} from '../../../state/store-redux';
import {setProfile} from '../../../state/profile-reducer';
import {toggleIsFetching} from '../../../state/users-reducer';
import {ProfileInfo} from './ProfileInfo';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

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

type MapStateToPropsType = {
    profile: ProfileInfoResponseType | null
}

type MapDispatchToPropsType = {
    setProfile: (profile: ProfileInfoResponseType) => void
    toggleIsFetching: (isFetching: boolean) => void
}

type ProfileInfoType = MapStateToPropsType & MapDispatchToPropsType

type RouterType = {
    router: {
        location: {
            hash: string
            key: string
            pathname: string
            state: string
        }
        navigate: (to: string, options?: {}) => void
        params: {
            id?: string
        }
    }
};

type ProfileContainerInfoType = ProfileInfoType & RouterType

// 2м параметром типизируется состояние, но у меня нет тут состояния поэтому пока опустим
class ProfileInfoContainer extends Component<ProfileContainerInfoType, any> {
    componentDidMount() {
        const paramsId = this.props.router.params.id;
        const id = paramsId ? +paramsId : 25141; // если id нет, подставляем 25141

        this.props.toggleIsFetching(true);
        axios.get<ProfileInfoResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
            .then(response => {
                this.props.setProfile(response.data);
                this.props.toggleIsFetching(false);
            });
    }

    render() {
        return <ProfileInfo profile={this.props.profile}/>;
    }
}

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
const withRouter = (ProfileInfoContainer: ComponentType<ProfileContainerInfoType>) => {
    // исключаем из типа ProfileContainerInfoType типы RouterType
    return function ComponentWithRouterProp(props: Omit<ProfileContainerInfoType, keyof RouterType>) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return <ProfileInfoContainer {...props} router={{location, navigate, params}}/>;
    };
};

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profileInfo
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
(mapStateToProps, {setProfile, toggleIsFetching})(withRouter(ProfileInfoContainer));
