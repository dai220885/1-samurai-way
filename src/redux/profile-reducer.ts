import {
    ActionsType,
    AddPostActionType,
    ProfilePageType,
    RemovePostActionType,
    SetNewPostTextActionType,
    StateType
} from './store';
import {PostType} from '../components/Profile/MyPosts/MyPosts';
import {v1} from 'uuid';

const ADD_POST = 'ADD-POST';
const REMOVE_POST = 'REMOVE-POST';
const SET_NEW_POST_TEXT = 'SET-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: v1(), message: 'Hello, it\'s a post 1', likeCount: 7},
        {id: v1(), message: 'Hi, it\'s a post 2', likeCount: 3},
        {id: v1(), message: 'By-By', likeCount: 4},
        {id: v1(), message: 'How are you?', likeCount: 1},
    ],
    newPostText: ''
}

const profileReducer = (state: ProfilePageType = initialState, action: ActionsType) => {
    //debugger
    switch (action.type) {
        case ADD_POST:
            //можно вообще не передавать  извне текст поста, который хотим добавить, а брать его из поля newPostText (которое будет содержать актуальное значение, введенное в TextArea
            let newPost: PostType = {id: v1(), message: state.newPostText, likeCount: 0}
            state.posts = [newPost, ...state.posts]
            state.newPostText = '';
            //this._rerenderEntireTree(this._state);
            //так тоже работает, но новый пост добавится в конец списка постов:
            //state.profilePage.posts.push(newPost)
            return state;
        case REMOVE_POST:
            state.posts = state.posts.filter(p => p.id !== action.postForRemoveId) // при вызове в диспатч нужно передать action c доп. свойством "postForRemoveId"
        //this._rerenderEntireTree(this._state);
            return state;
        case SET_NEW_POST_TEXT:
            state.newPostText = action.newPostText; // при вызове в диспатч нужно передать action c доп. свойством "newPostText"
            return state;
        default: return state;
    }
}

//функции, которые будут создавать объекты action (чтобы не запутаться и не ошибиться при создании непосредственно в компоненте
export const addPostActionCreator =()=> ({type: ADD_POST}) as const
export const removePostActionCreator = (postForRemoveId: string) => ({type: REMOVE_POST, postForRemoveId: postForRemoveId}) as const
export const setNewPostTextActionCreator = (newPostText:string) => ({type: SET_NEW_POST_TEXT, newPostText: newPostText}) as const
export default profileReducer;