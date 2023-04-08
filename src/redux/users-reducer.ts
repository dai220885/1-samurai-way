const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT';
const SET_IS_FETCHING = 'SET-IS-FETCHING';

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
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    isFetching: boolean
}

let initialState: UserPageType = {
    users: [
        //     {
        //         id: v1(),
        //         photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
        //         followed: true,
        //         fullName: 'Alexandr',
        //         status: 'i am a student',
        //         location: {city: 'Minsk', country: 'Belarus'}
        //     },
        //     {
        //         id: v1(),
        //         photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
        //         followed: false,
        //         fullName: 'Victor',
        //         status: 'i like music',
        //         location: {city: 'Vitebsk', country: 'Belarus'}
        //     },
        //     {
        //         id: v1(),
        //         photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQSa00Huhj-j07rhDP24F3O0X0i05SQwI4A&usqp=CAU',
        //         followed: true,
        //         fullName: 'Sergey',
        //         status: 'good boy',
        //         location: {city: 'Moscow', country: 'Russia'}
        //     },
    ],
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
} as UserPageType

const usersReducer = (state: UserPageType = initialState, action: UsersReducerActionsType): UserPageType => {
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
            return {...state, users: action.payload.users} //так полностью заменяем существующих юзеров
            //return {...state, users: [...state.users, ...action.payload.users]} //так добавляем новых юзеров к существующим
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.payload.currentPageNumber}
        }
        case SET_USERS_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.payload.usersTotalCount}
        }
        case SET_IS_FETCHING: {
            return {...state, isFetching: action.payload.isFetching}
        }
        default:
            return state;
    }
}
export type UsersReducerActionsType =
    FollowUserActionType
    | UnfollowUserActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetUsersTotalCountActionType
    |SetIsFetchingActionType
//автоматически типизируем ActionCreator-ы, но в ActionCreator-е обязательно добавлять в конце 'as const', чтобы свойство type воспринималось не как любая строка, а как константа:
export type FollowUserActionType = ReturnType<typeof followUser>
export type UnfollowUserActionType = ReturnType<typeof unfollowUser>
export type SetUsersActionType = ReturnType<typeof setUsers>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
export type SetUsersTotalCountActionType = ReturnType<typeof setUsersTotalCount>
export type SetIsFetchingActionType = ReturnType<typeof setIsFetching>

//функции (ActionCreator-ы), которые будут создавать объекты action (чтобы не запутаться и не ошибиться при создании непосредственно в компоненте
export const followUser = (userId: string) => ({
        type: FOLLOW_USER,
        payload: {
            userId
        }
    } as const
)
export const unfollowUser = (userId: string) => ({
        type: UNFOLLOW_USER,
        payload: {
            userId
        }
    } as const
)
export const setUsers = (users: UserType[]) => ({
        type: SET_USERS,
        payload: {
            users
        }
    } as const
)
export const setCurrentPage = (currentPageNumber: number) => ({
        type: SET_CURRENT_PAGE,
        payload: {
            currentPageNumber
        }
    } as const)
export const setUsersTotalCount = (usersTotalCount: number) => ({
        type: SET_USERS_TOTAL_COUNT,
        payload: {
            usersTotalCount
        }
    } as const)
export const setIsFetching = (isFetching: boolean) => ({
        type: SET_IS_FETCHING,
        payload: {
            isFetching
        }
    } as const)

export default usersReducer;
