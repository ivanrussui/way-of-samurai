import React, {Component, ComponentType} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {AppRootStateType} from '../../../state/store-redux';
import {
    getProfileTC,
    getStatusTC,
    updatePhotoTC,
    updateProfileTC,
    updateStatusTC
} from '../../../state/profile-reducer';
import {ProfileInfo} from './ProfileInfo';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {ProfileInfoResponseType} from '../../../api/api';
import {ProfileStatusWithHooks} from './ProfileStatus/ProfileStatusWithHooks';

type MapStateToPropsType = {
    profile: ProfileInfoResponseType | null
    status: string
    fieldErrors: Record<string, string> | null
}

type ProfileContainerInfoType = PropsFromRedux & RouterType

// 2м параметром типизируется состояние, но у меня нет тут состояния поэтому пока опустим
class ProfileInfoContainer extends Component<ProfileContainerInfoType, {}> {
    componentDidMount() {
        this.getProfileInfo();
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerInfoType>, prevState: Readonly<{}>, snapshot?: null) {
        if (this.props.router.params.id !== prevProps.router.params.id) {
            this.getProfileInfo();
        }
    }

    getProfileInfo() {
        const paramsId = this.props.router.params.id;
        const id = paramsId ? +paramsId : 25141; // если id нет, подставляем 25141

        this.props.getProfileTC(id);
        this.props.getStatusTC(id);
    }

    render() {
        return <>
            <ProfileStatusWithHooks status={this.props.status} updateStatusTC={this.props.updateStatusTC}/>
            <ProfileInfo profile={this.props.profile} isOwner={!this.props.router.params.id}
                         updatePhotoTC={this.props.updatePhotoTC} updateProfileTC={this.props.updateProfileTC}
                         fieldErrors={this.props.fieldErrors}/>
        </>;
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

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profileInfo,
    status: state.profilePage.status,
    fieldErrors: state.auth.fieldErrors
});

const connector = connect(
    mapStateToProps,
    {getProfileTC, getStatusTC, updateStatusTC, updatePhotoTC, updateProfileTC}
);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(withRouter(ProfileInfoContainer));
