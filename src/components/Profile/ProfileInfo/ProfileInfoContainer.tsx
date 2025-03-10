import React, {Component, ComponentType} from 'react';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../state/store-redux';
import {getProfileTC, getStatusTC, updateStatusTC} from '../../../state/profile-reducer';
import {ProfileInfo} from './ProfileInfo';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {ProfileInfoResponseType} from '../../../api/api';
import {compose} from 'redux';
import {ProfileStatus} from './ProfileStatus/ProfileStatus';

type MapStateToPropsType = {
    profile: ProfileInfoResponseType | null
    status: string
}

type MapDispatchToPropsType = {
    getProfileTC: (id: number) => void
    getStatusTC: (id: number) => void
    updateStatusTC: (status: string) => void
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
class ProfileInfoContainer extends Component<ProfileContainerInfoType, {}> {
    componentDidMount() {
        const paramsId = this.props.router.params.id;
        const id = paramsId ? +paramsId : 25141; // если id нет, подставляем 25141

        this.props.getProfileTC(id);
        this.props.getStatusTC(id);
    }

    render() {
        return <>
            <ProfileStatus status={this.props.status} updateStatusTC={this.props.updateStatusTC}/>
            <ProfileInfo profile={this.props.profile}/>
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

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profileInfo,
    status: state.profilePage.status
});

// export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
// (mapStateToProps, {getProfileTC})(withRouter(ProfileInfoContainer));

export default compose<ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>
    (mapStateToProps, {getProfileTC, getStatusTC, updateStatusTC}),
    withRouter
)
(ProfileInfoContainer);