import React from 'react';
import {UserType} from '../../redux/users-reducer';
import styles from './Users.module.css'
import {v1} from 'uuid';
import axios from 'axios';
import {RootUsersPropsType} from './UsersContainer';
//import * as axios from 'axios'; //? в видео так сказано делать

type UsersPropsType = {
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
export const Users = (props: UsersPropsType) => {
    const getUsers = () => {
        if (props.users.length === 0){
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response =>{
                    //debugger
                    //в newUsers положили массив новых пользователей, которых получили, промапив массив response.data.items и преобразовав в тип UserType (el в мапе ругался на типизацию (Parameter 'el' implicitly has an 'any' type), пришлось указать его тип). затем полученный массив newUsers передали в колбэк из пропсов (props.setUsers())
                    //можно было просто изменить UserType под тот формат данных о пользователе, который приходит с сервера
                    let newUsers: UserType[] = response.data.items.map((el:{ id: any; photos: {small: string, large: string}; followed: any; name: any; status: any; }):UserType =>
                        ({
                            id: el.id,
                            photoUrl: el.photos.small? el.photos.small: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXTBU5APFtvEEsvOwobgk6YEjQUVuQjZTbGFKRjDNQ1iQwK0mTbpHoUZFPAgEFvlaf8gY&usqp=CAU',
                            followed: el.followed,
                            fullName: el.name,
                            status: el.status,  location: {
                                city: '',
                                country: ''
                            }}))
                    props.setUsers(newUsers)
                })
        }
    }


    // {props.setUsers(
    //     [
    //         {
    //             id: v1(),
    //             photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
    //             followed: true,
    //             fullName: 'Alexandr2',
    //             status: 'i am a student',
    //             location: {city: 'Minsk', country: 'Belarus'}
    //         },
    //         {
    //             id: v1(),
    //             photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
    //             followed: false,
    //             fullName: 'Victor2',
    //             status: 'i like music',
    //             location: {city: 'Vitebsk', country: 'Belarus'}
    //         },
    //         {
    //             id: v1(),
    //             photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
    //             followed: true,
    //             fullName: 'Sergey2',
    //             status: 'good boy',
    //             location: {city: 'Moscow', country: 'Russia'}
    //         },
    //     ],
    // )}

    //в зависимости от того, подписаны ли мы на пользователя, в коллбэк кнопки передается либо функция followUser, либо unFollowUser
    let followOnClickHandler = (followed: boolean, userId: string) => {
        followed ? props.unfollowUser(userId) : props.followUser(userId)
    }
    return (
        <div>
            <button onClick={getUsers}>Get users</button>
            {
                props.users.map(user =>
                    <div key={user.id}>
                        <span>
                            <div>
                                <img src={user.photoUrl} alt = '   photo   'className={styles.userPhoto}/>
                            </div>
                            <div>
                                <button onClick={() => {
                                    followOnClickHandler(user.followed, user.id)
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
    );
};