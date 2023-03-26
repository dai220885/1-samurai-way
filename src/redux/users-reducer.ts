import {v1} from 'uuid';

const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';

export type UserType = {
    id: string
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: {
        city: string
        country: string
    }
}
export type UserPageType = {
    users: UserType[]
}

let initialState: UserPageType = {
    users: [
        {
            id: v1(),
            photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
            followed: true,
            fullName: 'Alexandr',
            status: 'i am a student',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: v1(),
            photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
            followed: false,
            fullName: 'Victor',
            status: 'i like music',
            location: {city: 'Vitebsk', country: 'Belarus'}
        },
        {
            id: v1(),
            photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
            followed: true,
            fullName: 'Sergey',
            status: 'good boy',
            location: {city: 'Moscow', country: 'Russia'}
        },
    ],
}

const usersReducer = (state: UserPageType = initialState, action: UsersReducerActionType): UserPageType => {
    switch (action.type) {
        case FOLLOW_USER: {
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.userId ? {...user, followed: true} : user)
            }
        }
        case UNFOLLOW_USER: {
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.userId ? {...user, followed: false} : user)
            }
        }
        case SET_USERS: {
            //return {...state, users: action.payload.users} //так полностью заменяем существующих юзеров
            return {...state, users: [...state.users, ...action.payload.users]}
        }

        default:
            return state;
    }
}
export type UsersReducerActionType =
    FollowUserActionType
    | UnFollowUserActionType
    | SetUsersActionType
//автоматически типизируем ActionCreator-ы, но в ActionCreator-е обязательно добавлять в конце 'as const', чтобы свойство type воспринималось не как любая строка, а как константа:
export type FollowUserActionType = ReturnType<typeof followUserAC>
export type UnFollowUserActionType = ReturnType<typeof unFollowUserAC>
export type SetUsersActionType = ReturnType<typeof setUsersAC>


//функции (ActionCreator-ы), которые будут создавать объекты action (чтобы не запутаться и не ошибиться при создании непосредственно в компоненте
export const followUserAC = (userId: string) => ({
        type: FOLLOW_USER,
        payload: {
            userId
        }
    } as const
)
export const unFollowUserAC = (userId: string) => ({
        type: UNFOLLOW_USER,
        payload: {
            userId
        }
    } as const
)
export const setUsersAC = (users: UserType[]) => ({
        type: SET_USERS,
        payload: {
            users
        }
    } as const
)
export default usersReducer;