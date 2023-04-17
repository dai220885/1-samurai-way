import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    followUser, setCurrentPage, toggleIsFetching,
    setUsers, setUsersTotalCount,
    unfollowUser,
    UsersReducerActionsType,
    UserType, toggleIsFollowingInProgress
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
        this.props.toggleIsFetching(true)
        userAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            //debugger
            //в newUsers положили массив новых пользователей, которых получили, промапив массив response.data.items и преобразовав в тип UserType (el в мапе ругался на типизацию (Parameter 'el' implicitly has an 'any' type), пришлось указать его тип). затем полученный массив newUsers передали в колбэк из пропсов (props.setUsers())
            //можно было просто изменить UserType под тот формат данных о пользователе, который приходит с сервера
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
            console.log(newUsers)
            const usersTotalCount = data.totalCount;
            this.props.setUsers(newUsers);
            this.props.setUsersTotalCount(usersTotalCount);
            this.props.toggleIsFetching(false);
        })
    }

    followOnClickHandler = (followed: boolean, userId: string) => {
        followed ? this.props.unfollowUser(userId) : this.props.followUser(userId)
    }
    pageNumberOnClickHandler = (currentPageNumber: number) => {
        this.props.setCurrentPage(currentPageNumber);
        this.props.toggleIsFetching(true);
        userAPI.getUsers(currentPageNumber, this.props.pageSize).then(data => {
                //debugger
                //в newUsers положили массив новых пользователей, которых получили, промапив массив response.data.items и преобразовав в тип UserType (el в мапе ругался на типизацию (Parameter 'el' implicitly has an 'any' type), пришлось указать его тип). затем полученный массив newUsers передали в колбэк из пропсов (props.setUsers())
                //можно было просто изменить UserType под тот формат данных о пользователе, который приходит с сервера
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
                this.props.toggleIsFetching(false)
                this.props.setUsers(newUsers)
            })
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
                    followOnClickHandler={this.followOnClickHandler}
                    toggleIsFollowing={(IsFollowingInProgress, userId: string)=>{this.props.toggleIsFollowingInProgress(IsFollowingInProgress, userId)}}
                />
            </>
        )
    }
}


//UsersPropsType тот же тип, что и "type RootUsersPropsType = MapStateToPropsType & MapDispatchToPropsType", просто на RootUsersPropsType иногда в строке "const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClassComponent);" в UsersClassComponent выдает ошибку типизации (Уже не выдает))))
export type UsersPropsType = {
    users: UserType[]
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    followUser: (userId: string) => void
    unfollowUser: (userId: string) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (currentPageNumber: number) => void
    setUsersTotalCount: (usersTotalCount: number) => void;
}
export type RootUsersPropsType = MapStateToPropsType & MapDispatchToPropsType
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
// export type MapDispatchToPropsType = {
//     followUser: (userId: string) => void;
//     unfollowUser: (userId: string) => void;
//     setUsers: (users: UserType[]) => void;
//     setCurrentPage: (currentPageNumber: number) => void;
//     setUsersTotalCount: (usersTotalCount: number) => void;
//     setIsFetching: (isFetching: boolean) => void;
// }
//можно использовать автоматическую типизацию:
//с автоматической типизацией в строке "const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClassComponent);" в UsersClassComponent выдает ошибку типизации (уже не выдает)))
type MapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>
let mapDispatchToProps = (dispatch: Dispatch<UsersReducerActionsType>) => {
    return {
        //можно просто описать функцию, по названию которой она будет доступна в пропсах:
        //followUser(userId: string) {dispatch(followUserAC(userId))},
        //а можно указать название свойства, которому присвоить функцию:
        followUser: (userId: string) => {
            dispatch(followUser(userId))
        },
        unfollowUser: (userId: string) => dispatch(unfollowUser(userId)),
        setUsers: (users: UserType[]) => dispatch(setUsers(users)),
        setCurrentPage: (currentPageNumber: number) => dispatch(setCurrentPage(currentPageNumber)),
        setUsersTotalCount: (usersTotalCount: number) => dispatch(setUsersTotalCount(usersTotalCount)),
        toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetching(isFetching)),
        toggleIsFollowingInProgress: (isFollowingInProgress: boolean, userId: string) => dispatch(toggleIsFollowingInProgress(isFollowingInProgress, userId)),
    }
}
//const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users); //когда две пары круглых скобок, то значит, что после первого вызова функция что-то вернет, а вторыми скобками мы вызываем, то, что вернется после первого вызова)))

//вместо mapDispatchToProps в connect передали объект со свойствами, идентичными названиям экшенкриэйтеров
const UsersContainer = connect(mapStateToProps, {
    followUser,
    unfollowUser,
    setUsers,
    setCurrentPage,
    setUsersTotalCount,
    toggleIsFetching,
    toggleIsFollowingInProgress,
})(UsersClassComponent);

export default UsersContainer;