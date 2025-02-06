import React, {Component, ComponentType} from 'react';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../state/store-redux';
import {getProfileTC} from '../../../state/profile-reducer';
import {ProfileInfo} from './ProfileInfo';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {ProfileInfoResponseType} from '../../../api/api';

type MapStateToPropsType = {
    profile: ProfileInfoResponseType | null
}

type MapDispatchToPropsType = {
    getProfileTC: (id: number) => void
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

        this.props.getProfileTC(id);
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
(mapStateToProps, {getProfileTC})(withRouter(ProfileInfoContainer));
