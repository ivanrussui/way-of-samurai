import {connect} from 'react-redux';
import {AppRootStateType} from '../../state/store-redux';
import {Dispatch} from 'redux';
import {followUnfollowAC, ItemType, setPageAC, setTotalCountAC, setUsersAC} from '../../state/users-reducer';
import axios from 'axios';
import {Component} from 'react';
import {Users} from './Users';

type MapStateToPropsType = {
    items: ItemType[]
    totalCount: number
    page: number
    count: number
}

type MapDispatchToPropsType = {
    followUnfollow: (useId: number, followed: boolean) => void
    setUsers: (users: ItemType[]) => void
    setPage: (page: number) => void
    setTotalCount: (totalCount: number) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

export type ItemResponseType = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

type ResponseType = {
    items: ItemResponseType[]
    totalCount: number
    error: string
}

// 2м параметром типизируется состояние, но у меня нет тут состояния поэтому пока опустим
export class UsersContainer extends Component<UsersPropsType> { // class Component<P, S> {
    componentDidMount() {
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.page}&count=${this.props.count}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
            });
    }

    // сейчас этот метод фейковый. в будущем будет с запросом
    changeFollow = (useId: number, followed: boolean) => {
        this.props.followUnfollow(useId, !followed);
    };

    setPageHandler = (page: number) => {
        this.props.setPage(page);
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.count}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    };

    render() {
        return <Users page={this.props.page} count={this.props.count}
                      items={this.props.items} totalCount={this.props.totalCount}
                      changeFollow={this.changeFollow} setPageHandler={this.setPageHandler}/>;
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    items: state.usersPage.users.items,
    totalCount: state.usersPage.users.totalCount,
    page: state.usersPage.page,
    count: state.usersPage.count
});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
    followUnfollow: (useId: number, followed: boolean) => {
        dispatch(followUnfollowAC(useId, followed));
    },
    setUsers: (users: ItemType[]) => {
        dispatch(setUsersAC(users));
    },
    setPage: (page: number) => {
        dispatch(setPageAC(page));
    },
    setTotalCount: (totalCount: number) => {
        dispatch(setTotalCountAC(totalCount));
    },
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, mapDispatchToProps)(UsersContainer);