import {connect} from 'react-redux';
import {AppRootStateType} from '../../state/store-redux';
import {followUnfollow, setPage, setTotalCount, setUsers, toggleIsFetching} from '../../state/users-reducer';
import axios from 'axios';
import {Component} from 'react';
import {Users} from './Users';
import {Preloader} from '../Common/Preloader/Preloader';

type MapStateToPropsType = {
    items: ItemResponseType[]
    totalCount: number
    page: number
    count: number
    isFetching: boolean
}

type MapDispatchToPropsType = {
    followUnfollow: (useId: number, followed: boolean) => void
    setUsers: (users: ItemResponseType[]) => void
    setPage: (page: number) => void
    setTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

export type ItemResponseType = {
    id: number
    name: string
    status: string
    uniqueUrlName: string
    followed: boolean
    photos: {
        small: string
        large: string
    }
}

export type UsersResponseType = {
    items: ItemResponseType[]
    totalCount: number
    error: string
}

// 2м параметром типизируется состояние, но у меня нет тут состояния поэтому пока опустим
export class UsersContainer extends Component<UsersPropsType> { // class Component<P, S> {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get<UsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.page}&count=${this.props.count}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
            });
    }

    // сейчас этот метод фейковый. в будущем будет с запросом
    changeFollow = (useId: number, followed: boolean) => {
        this.props.followUnfollow(useId, !followed);
    };

    setPageHandler = (page: number) => {
        this.props.toggleIsFetching(true);
        this.props.setPage(page);
        axios.get<UsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.count}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
            });
    };

    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users page={this.props.page} count={this.props.count}
                         items={this.props.items} totalCount={this.props.totalCount}
                         changeFollow={this.changeFollow} setPageHandler={this.setPageHandler}
                />
            }
        </>;
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    items: state.usersPage.users.items,
    totalCount: state.usersPage.users.totalCount,
    page: state.usersPage.page,
    count: state.usersPage.count,
    isFetching: state.usersPage.isFetching
});

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
//     followUnfollow: (useId: number, followed: boolean) => {
//         dispatch(followUnfollowAC(useId, followed));
//     },
//     setUsers: (users: ItemType[]) => {
//         dispatch(setUsersAC(users));
//     },
//     setPage: (page: number) => {
//         dispatch(setPageAC(page));
//     },
//     setTotalCount: (totalCount: number) => {
//         dispatch(setTotalCountAC(totalCount));
//     },
//     toggleIsFetching: (isFetching: boolean) => {
//         dispatch(toggleIsFetchingAC(isFetching));
//     },
// });

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {
    followUnfollow,
    setUsers,
    setPage,
    setTotalCount,
    toggleIsFetching
})(UsersContainer);