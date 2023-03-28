import {v1} from 'uuid';

const ADD_POST = 'ADD-POST';
const REMOVE_POST = 'REMOVE-POST';
const SET_NEW_POST_TEXT = 'SET-NEW-POST-TEXT';

export type PostType = {
    id: string
    message: string
    likeCount: number
}
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}
let initialState: ProfilePageType = {
    posts: [
        {id: v1(), message: 'Hello, it\'s a post 1', likeCount: 7},
        {id: v1(), message: 'Hi, it\'s a post 2', likeCount: 3},
        {id: v1(), message: 'By-By', likeCount: 4},
        {id: v1(), message: 'How are you?', likeCount: 1},
    ],
    newPostText: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: ProfileReducerActionType): ProfilePageType => {
    //debugger
    switch (action.type) {
        case ADD_POST: {
            //можно вообще не передавать  извне текст поста, который хотим добавить, а брать его из поля newPostText (которое будет содержать актуальное значение, введенное в TextArea
            let newPost: PostType = {id: v1(), message: state.newPostText, likeCount: 0}
            return {...state, posts: [newPost, ...state.posts], newPostText: ''}
            //state.posts = [newPost, ...state.posts]
            //state.newPostText = '';
            //this._rerenderEntireTree(this._state);
            //так тоже работает, но новый пост добавится в конец списка постов:
            //state.profilePage.posts.push(newPost)
        }
        case REMOVE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.payload.postForRemoveId)}
            //state.posts = state.posts.filter(p => p.id !== action.payload.postForRemoveId)
            //this._rerenderEntireTree(this._state);
        }
        case SET_NEW_POST_TEXT: {
            return {...state, newPostText: action.payload.newPostText};
            //state.newPostText = action.payload.newPostText;
        }
        default: return state;
    }
}

export type ProfileReducerActionType =
    AddPostActionType
    | RemovePostActionType
    | SetNewPostTextActionType

//автоматически типизируем ActionCreator-ы, но в ActionCreator-е обязательно добавлять в конце 'as const', чтобы свойство type воспринималось не как любая строка, а как константа:
export type AddPostActionType =  ReturnType<typeof addPostAC>//можно делать так, чтобы не дублировать
export type RemovePostActionType = ReturnType<typeof removePostAC> //можно делать так, чтобы не дублировать
export type SetNewPostTextActionType = ReturnType<typeof setNewPostTextAC>//можно делать так, чтобы не дублировать

//функции (ActionCreator-ы), которые будут создавать объекты action
export const addPostAC =()=> ({type: ADD_POST}) as const
export const removePostAC = (postForRemoveId: string) => ({type: REMOVE_POST, payload: {postForRemoveId}}) as const
export const setNewPostTextAC = (newPostText:string) => ({type: SET_NEW_POST_TEXT, payload: {newPostText}}) as const
export default profileReducer;