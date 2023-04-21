import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    followUserSuccess, setCurrentPage, toggleIsFetching,
    setUsers, setUsersTotalCount,
    unfollowUserSuccess,
    UsersReducerActionsType,
    UserType, toggleIsFollowingInProgress, getUsersThunkCreator, followUserThunkCreator, unfollowUserThunkCreator
} from '../../redux/users-reducer';
import {Dispatch} from 'redux';
import {UsersFuncComponent} from './UsersFuncComponent';
import {Preloader} from '../common/Preloader/Preloader';
import {userAPI} from '../../api/api';

class UsersClassComponent extends React.Component <RootUsersPropsType> {
    // constructor(props:RootUsersPropsType) {
    //     super(props);
    // } //если конструктор ничего не делает, кроме передачи пропсов конструктору родительского класса, то его можно не писать, т.к. все это и так происходит по умолчанию
    componentDidUpdate(prevProps: Readonly<RootUsersPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        console.log('UsersClassComponent.componentDidUpdate')
    }

    componentDidMount() {
        console.log('UsersClassComponent.componentDidMount')
        //диспатчим вызов санккриэйтора
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    // followOnClickHandler = (followed: boolean, userId: string) => {
    //     followed ? this.props.unfollowUser(userId) : this.props.followUser(userId)
    // }

    // followOnClickHandler = (userId: string) => {
    //     this.props.followUser(userId)
    // }
    // unfollowOnClickHandler = (userId: string) => {
    //     this.props.unfollowUser(userId)
    // }

    pageNumberOnClickHandler = (currentPageNumber: number) => {
        //this.props.setCurrentPage(currentPageNumber);
        //диспатчим вызов санккриэйтора
        this.props.getUsers(currentPageNumber, this.props.pageSize)
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pagesNumbers = [];
        for (let i = 1; i <= pagesCount; i++) {
            pagesNumbers.push(i)
        }
        return (
            //все, что раньше отрисовывала UsersClassComponent, теперь вынесено в отдельную компоненту UsersFuncComponent
            <>
                {this.props.isFetching ?
                    <Preloader/>
                    : null}
                <UsersFuncComponent
                    pagesNumbers={pagesNumbers}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    isFollowingInProgress={this.props.isFollowingInProgress}
                    pageNumberOnClickHandler={this.pageNumberOnClickHandler}
                    followOnClickHandler={this.props.follow}
                    unfollowOnClickHandler={this.props.unfollow}
                    //toggleIsFollowing={(IsFollowingInProgress, userId: string)=>{this.props.toggleIsFollowingInProgress(IsFollowingInProgress, userId)}}
                />
            </>
        )
    }
}

//экспортируем только для того, чтобы неиспользуемая уже компонента users.tsx не падала с ошибкой
export type RootUsersPropsType = MapStateToPropsType & MapDispatchToPropsType & OwnUsersContainerPropsType
//типизация пропсов, которые могут прийти в компоненту не из коннекта, а непосредственно через атрибуты "тега", когда компонента используется: <Component param1={} param2={}/>
type OwnUsersContainerPropsType = {

}
// export type MapStateToPropsType = {
//     users: UserType[],
//     pageSize: number,
//     totalUsersCount: number,
//     currentPage: number
// }
//то же, что и выше, только автоматически типизируем:
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
let mapStateToProps = (state: AppStateType) => {
    return {
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        isFetching: state.userPage.isFetching,
        isFollowingInProgress: state.userPage.isFollowingInProgress,
    }
}
//титпизируем mapDispatchToProps
type MapDispatchToPropsType = {
    //followUser: (userId: string) => void,
    //unfollowUser: (userId: string) => void,
    //setUsers: (users: UserType[]) => void,
    //setCurrentPage: (currentPageNumber: number) => void,
    //setUsersTotalCount: (usersTotalCount: number) => void,
    //toggleIsFetching: (isFetching: boolean) => void,
    //toggleIsFollowingInProgress: (isFollowingInProgress: boolean, userId: string) => void,
    getUsers: (currentPage: number, pageSize: number)=> void,
    follow: (userId: string ) => void,
    unfollow: (userId: string ) => void,
}
//можно использовать автоматическую типизацию:
type MapDispatchToPropsType22 = ReturnType<typeof mapDispatchToProps>
let mapDispatchToProps = (dispatch: Dispatch<UsersReducerActionsType>) => {
    return {
        //можно просто описать функцию, по названию которой она будет доступна в пропсах:
        //followUser(userId: string) {dispatch(followUserAC(userId))},
        //а можно указать название свойства, которому присвоить функцию:
        followUser: (userId: string) => {
            dispatch(followUserSuccess(userId))
        },
        unfollowUser: (userId: string) => dispatch(unfollowUserSuccess(userId)),
        setUsers: (users: UserType[]) => dispatch(setUsers(users)),
        setCurrentPage: (currentPageNumber: number) => dispatch(setCurrentPage(currentPageNumber)),
        setUsersTotalCount: (usersTotalCount: number) => dispatch(setUsersTotalCount(usersTotalCount)),
        toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetching(isFetching)),
        toggleIsFollowingInProgress: (isFollowingInProgress: boolean, userId: string) => dispatch(toggleIsFollowingInProgress(isFollowingInProgress, userId)),
        getUsersThunkCreator: (currentPage: number, pageSize: number)=> {
            dispatch(toggleIsFetching(true))
            userAPI.getUsers(currentPage, pageSize).then(data => {
                const photoAvatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXTBU5APFtvEEsvOwobgk6YEjQUVuQjZTbGFKRjDNQ1iQwK0mTbpHoUZFPAgEFvlaf8gY&usqp=CAU'
                let newUsers: UserType[] = data.items.map((el: { id: any; photos: { small: string, large: string }; followed: any; name: any; status: any; }): UserType =>
                    ({
                        id: el.id,
                        photoUrl: el.photos.small ? el.photos.small : photoAvatarUrl,
                        followed: el.followed,
                        fullName: el.name,
                        status: el.status, location: {
                            city: '',
                            country: ''
                        }
                    }))
                //console.log(newUsers)
                dispatch(toggleIsFetching(false));
                const usersTotalCount = data.totalCount;
                dispatch(setUsers(newUsers));
                dispatch(setUsersTotalCount(usersTotalCount));

            })
        }
    }
}
 //когда две пары круглых скобок, то значит, что после первого вызова функция что-то вернет, а вторыми скобками мы вызываем, то, что вернется после первого вызова)))
//вместо mapDispatchToProps в connect передали объект со свойствами, идентичными названиям экшенкриэйтеров и санккриэйтеров
//для типизации коннекта, у него в угловых скобках указываем следующие типы:  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
const UsersContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnUsersContainerPropsType, AppStateType>(mapStateToProps, {
    //followUser: followUserSuccess,
    //unfollowUser: unfollowUserSuccess,
    //setUsers,
    //setCurrentPage,
    //setUsersTotalCount,
    //toggleIsFetching,
    //toggleIsFollowingInProgress,
    getUsers: getUsersThunkCreator,
    follow: followUserThunkCreator,
    unfollow: unfollowUserThunkCreator,
})(UsersClassComponent);

export default UsersContainer;