import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    followUser, setCurrentPage, setIsFetching,
    setUsers, setUsersTotalCount,
    unfollowUser,
    UsersReducerActionsType,
    UserType
} from '../../redux/users-reducer';
import {Dispatch} from 'redux';
import {UsersFuncComponent} from './UsersFuncComponent';
import axios from 'axios';
import {Preloader} from '../common/Preloader/Preloader';

//import * as axios from 'axios'; //? в видео так сказано делать


class UsersClassComponent extends React.Component <RootUsersPropsType> {
    // constructor(props:RootUsersPropsType) {
    //     super(props);
    // } //если конструктор ничего не делает, кроме передачи пропсов конструктору родительского класса, то его можно не писать, т.к. все это и так происходит по умолчанию
    componentDidUpdate(prevProps: Readonly<RootUsersPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        console.log('UsersClassComponent.componentDidUpdate')
    }

    componentDidMount() {
        console.log('UsersClassComponent.componentDidMount')
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {withCredentials: true})
            .then(response => {
                //debugger
                //в newUsers положили массив новых пользователей, которых получили, промапив массив response.data.items и преобразовав в тип UserType (el в мапе ругался на типизацию (Parameter 'el' implicitly has an 'any' type), пришлось указать его тип). затем полученный массив newUsers передали в колбэк из пропсов (props.setUsers())
                //можно было просто изменить UserType под тот формат данных о пользователе, который приходит с сервера
                const photoAvatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXTBU5APFtvEEsvOwobgk6YEjQUVuQjZTbGFKRjDNQ1iQwK0mTbpHoUZFPAgEFvlaf8gY&usqp=CAU'
                let newUsers: UserType[] = response.data.items.map((el: { id: any; photos: { small: string, large: string }; followed: any; name: any; status: any; }): UserType =>
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
                const usersTotalCount = response.data.totalCount;
                this.props.setUsers(newUsers);
                this.props.setUsersTotalCount(usersTotalCount);
                this.props.setIsFetching(false);
            })
    }

    followOnClickHandler = (followed: boolean, userId: string) => {
        followed ? this.props.unfollowUser(userId) : this.props.followUser(userId)
    }
    pageNumberOnClickHandler = (currentPageNumber: number) => {
        this.props.setCurrentPage(currentPageNumber);
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPageNumber}&count=${this.props.pageSize}`,  {withCredentials: true})
            .then(response => {
                //debugger
                //в newUsers положили массив новых пользователей, которых получили, промапив массив response.data.items и преобразовав в тип UserType (el в мапе ругался на типизацию (Parameter 'el' implicitly has an 'any' type), пришлось указать его тип). затем полученный массив newUsers передали в колбэк из пропсов (props.setUsers())
                //можно было просто изменить UserType под тот формат данных о пользователе, который приходит с сервера
                const photoAvatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXTBU5APFtvEEsvOwobgk6YEjQUVuQjZTbGFKRjDNQ1iQwK0mTbpHoUZFPAgEFvlaf8gY&usqp=CAU'
                let newUsers: UserType[] = response.data.items.map((el: { id: any; photos: { small: string, large: string }; followed: any; name: any; status: any; }): UserType =>
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
                this.props.setIsFetching(false)
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
            // <div>
            //     <div>
            //         {pagesNumbers.map(number =>
            //             <span className={
            //                 this.props.currentPage === number
            //                     ? styles.selectedPage
            //                     : ''} onClick={()=>this.pageNumberOnClickHandler(number)}>{number}
            //             </span>
            //         )}
            //     </div>
            //     {
            //         this.props.users.map(user =>
            //             <div key={user.id}>
            //             <span>
            //                 <div>
            //                     <img src={user.photoUrl} alt="   photo   " className={styles.userPhoto}/>
            //                 </div>
            //                 <div>
            //                     <button onClick={() => {
            //                         this.followOnClickHandler(user.followed, user.id)
            //                     }}>
            //                         {user.followed ? 'Unfollow' : 'Follow'} </button>
            //                 </div>
            //             </span>
            //                 <span>
            //                 <span>
            //                     <div>{`${user.fullName} - ${user.followed}`}</div><div>{user.status}</div>
            //                 </span>
            //                 <span>
            //                     <div>{user.location.country}</div>
            //                     <div>{user.location.city}</div>
            //                 </span>
            //             </span>
            //             </div>)
            //     }
            // </div>
            <>
                {this.props.isFetching ?
                    <Preloader/>
                    : null}
                <UsersFuncComponent
                    pagesNumbers={pagesNumbers}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    pageNumberOnClickHandler={this.pageNumberOnClickHandler}
                    followOnClickHandler={this.followOnClickHandler}
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
        setIsFetching: (isFetching: boolean) => dispatch(setIsFetching(isFetching)),
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
    setIsFetching,
})(UsersClassComponent);

export default UsersContainer;