import {v1} from 'uuid';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {authAPI, profileAPI} from '../api/api';
import {AuthReducerActionType, setAuthUserDataAC} from './auth-reducer';

const ADD_POST = 'ADD-POST';
const REMOVE_POST = 'REMOVE-POST';
const SET_NEW_POST_TEXT = 'SET-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';


export type PostType = {
    id: string
    message: string
    likeCount: number
}
export type UserProfileType = {
    aboutMe: string,
    contacts: {
        facebook: string,
        website: string,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: string,
        github: string,
        mainLink: string
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: {
        small: string,
        large: string
    }
}
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
    profile: UserProfileType | undefined
    status: string
}
let initialState: ProfilePageType = {
    posts: [
        {id: v1(), message: 'Hello, it\'s a post 1', likeCount: 7},
        {id: v1(), message: 'Hi, it\'s a post 2', likeCount: 3},
        {id: v1(), message: 'By-By', likeCount: 4},
        {id: v1(), message: 'How are you?', likeCount: 1},
    ],
    newPostText: '',
    profile: undefined,
    status: '',
}

const profileReducer = (state: ProfilePageType = initialState, action: ProfileReducerActionType): ProfilePageType => {
    //debugger
    switch (action.type) {
        case ADD_POST: {
            //можно вообще не передавать  извне текст поста, который хотим добавить, а брать его из поля newPostText (которое будет содержать актуальное значение, введенное в TextArea
            let newPost: PostType = {id: v1(), message: state.newPostText, likeCount: 0}
            return {...state, posts: [newPost, ...state.posts], newPostText: ''}
        }
        case REMOVE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.payload.postForRemoveId)}
        }
        case SET_NEW_POST_TEXT: {
            return {...state, newPostText: action.payload.newPostText};
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.payload.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.payload.status}
        }
        default: return state;
    }
}

export type ProfileReducerActionType =
    AddPostActionType
    | RemovePostActionType
    | SetNewPostTextActionType
    |SetUserProfileActionType
    |SetStatusActionType

//автоматически типизируем ActionCreator-ы, но в ActionCreator-е обязательно добавлять в конце 'as const', чтобы свойство type воспринималось не как любая строка, а как константа:
export type AddPostActionType =  ReturnType<typeof addNewPost>//можно делать так, чтобы не дублировать
export type RemovePostActionType = ReturnType<typeof removePost> //можно делать так, чтобы не дублировать
export type SetNewPostTextActionType = ReturnType<typeof setNewPostText>//можно делать так, чтобы не дублировать
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>//м
export type SetStatusActionType = ReturnType<typeof setStatus>//м

//функции (ActionCreator-ы), которые будут создавать объекты action
export const addNewPost =()=> ({type: ADD_POST}) as const
export const removePost = (postForRemoveId: string) => ({type: REMOVE_POST, payload: {postForRemoveId}}) as const
export const setNewPostText = (newPostText:string) => ({type: SET_NEW_POST_TEXT, payload: {newPostText}}) as const
export const setUserProfile = (profile: UserProfileType) => ({type: SET_USER_PROFILE, payload: {profile}}) as const //?????fix any type !!!!!!!!!!!!!!!!!!!!!!!!
export const setStatus = (status: string) => ({type: SET_STATUS, payload: {status}}) as const



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ProfileReducerActionType>

export const getUserProfileThunkCreator =(userId: string): ThunkType => {
    return async (dispatch, getState) => {
        profileAPI.getProfile(userId).then(data => dispatch(setUserProfile(data)))
    }
}

export const getUserStatusThunkCreator =(userId: string): ThunkType => {
    return async (dispatch, getState) => {

        profileAPI.getStatus(userId).then(data => {
            //debugger
            dispatch(setStatus(data))
        })
    }
}

export const updateStatusThunkCreator =(newStatus: string): ThunkType => {
    return async (dispatch, getState) => {
        //debugger
        profileAPI.updateStatus(newStatus).then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatus(newStatus))
            }
        })
    }
}

export default profileReducer;