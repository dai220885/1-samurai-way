import React from 'react';
import {UserType} from '../../redux/users-reducer';
import styles from './Users.module.css'
import {v1} from 'uuid';
import axios from 'axios';
import {RootUsersPropsType} from './UsersContainer';

//import * as axios from 'axios'; //? в видео так сказано делать


export class UsersClassComponent extends React.Component <RootUsersPropsType> {
       constructor(props:RootUsersPropsType) {
           super(props);
       } //если конструктор ничего не делает, кроме передачи пропсов конструктору родительского класса, то его можно не писать, т.к. все это и так происходит по умолчанию
    componentDidUpdate(prevProps: Readonly<RootUsersPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        console.log('componentDidUpdate')
    }

    componentDidMount() {
        console.log('componentDidMount')
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
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
                const usersTotalCount = response.data.totalCount;
                this.props.setUsers(newUsers);
                this.props.setUsersTotalCount(usersTotalCount);
            })
    }

    followOnClickHandler = (followed: boolean, userId: string) => {
        followed ? this.props.unfollowUser(userId) : this.props.followUser(userId)
    }
    pageNumberOnClickHandler = (currentPageNumber: number) => {
        this.props.setCurrentPage(currentPageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPageNumber}&count=${this.props.pageSize}`)
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
            <div>
                <div>
                    {pagesNumbers.map(number =>
                        <span className={
                            this.props.currentPage === number
                                ? styles.selectedPage
                                : ''} onClick={()=>this.pageNumberOnClickHandler(number)}>{number}
                        </span>
                    )}
                </div>
                {
                    this.props.users.map(user =>
                        <div key={user.id}>
                        <span>
                            <div>
                                <img src={user.photoUrl} alt="   photo   " className={styles.userPhoto}/>
                            </div>
                            <div>
                                <button onClick={() => {
                                    this.followOnClickHandler(user.followed, user.id)
                                }}>
                                    {user.followed ? 'Unfollow' : 'Follow'} </button>
                            </div>
                        </span>
                            <span>
                            <span>
                                <div>{`${user.fullName} - ${user.followed}`}</div><div>{user.status}</div>
                            </span>
                            <span>
                                <div>{user.location.country}</div>
                                <div>{user.location.city}</div>
                            </span>
                        </span>
                        </div>)
                }
            </div>
        )
    }
}







