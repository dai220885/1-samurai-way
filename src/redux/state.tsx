import {DialogType, MessageType} from '../components/Dialogs/Dialogs';
import {PostType} from '../components/Profile/MyPosts/MyPosts';
import {v1} from 'uuid';
import profileReduser, {removePostActionCreator, setNewPostTextActionCreator} from './profile-reduser';
import dialogsReduser from './dialogs-reduser';

//переменные, в которые сохраним значения свойств type для dispatch
const ADD_POST = 'ADD-POST';
const REMOVE_POST = 'REMOVE-POST';
const SET_NEW_POST_TEXT = 'SET-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const REMOVE_MESSAGE = 'REMOVE-MESSAGE';
const SET_NEW_MESSAGE_TEXT = 'SET-NEW-MESSAGE-TEXT';

//subscribe вызывается в index.tsx и получает в качестве коллбэка функцию rerenderEntireTree (уже настоящую, которая перерисовывает все дерево)) Получив коллбэк subscribe присваивает его в локальную для state.tsx функцию rerenderEntireTree
export type ProfilePageType ={
        posts: PostType[]
        newPostText: string
}
export type MessagePageType ={
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string
}

export type StateType = {
    profilePage: ProfilePageType
    messagesPage: MessagePageType
}

export type AddPostActionType = {
    type: 'ADD-POST'
}
// export type RemovePostActionType = {
//     type: 'REMOVE-POST',
//     postForRemoveId: string
// }
export type RemovePostActionType = ReturnType<typeof removePostActionCreator> //можно делать так, чтобы не дублировать
export type SetNewPostTextActionType = {
    type: 'SET-NEW-POST-TEXT',
    newPostText: string
}
export type AddMessageActionType = {
    type: 'ADD-MESSAGE'
}
export type RemoveMessageActionType = {
    type: 'REMOVE-MESSAGE',
    messageForRemoveId: string
}
export type SetNewMessageActionType = {
    type: 'SET-NEW-MESSAGE-TEXT',
    newMessageText: string
}

export type ActionsType =
    AddPostActionType
    |RemovePostActionType
    |SetNewPostTextActionType
    |AddMessageActionType
    |RemoveMessageActionType
    |SetNewMessageActionType

export type StoreType = {
    _state: StateType
    _rerenderEntireTree: (state: StateType) => void //в видео этоо _callSubscriber
    setNewPostText: (newText: string) => void
    removeMessage: (id: string) => void
    setNewMessageText: (newMessage: string) => void
    addNewMessage: (message: string) => void
    addNewPost: () => void
    removePost: (id: string) => void
    subscribe: (observer: (state: StateType) => void) => void
    getState: () => StateType
    dispatch: (action: ActionsType) => void
}

export const store: StoreType = {
    _state: {
        messagesPage: {
            dialogs: [
                {id: v1(), name: 'Alexandr'},
                {id: v1(), name: 'Victor'},
                {id: v1(), name: 'Sergey'},
                {id: v1(), name: 'Vladimir'},
                {id: v1(), name: 'Petr'},
                {id: v1(), name: 'Galina'},
            ],
            messages: [
                {id: v1(), message: 'Helloooo!!!'},
                {id: v1(), message: 'How are you?'},
                {id: v1(), message: 'Good morning, bro'},
                {id: v1(), message: 'Good Buy!!'},
                {id: v1(), message: 'Good Buy!!'},
                {id: v1(), message: 'Good Buy!!'},
                {id: v1(), message: 'Good Buy!!'},
            ],
            newMessageText: ''
        },
        profilePage: {
            posts: [
                {id: v1(), message: 'Hello, it\'s a post 1', likeCount: 7},
                {id: v1(), message: 'Hi, it\'s a post 2', likeCount: 3},
                {id: v1(), message: 'By-By', likeCount: 4},
                {id: v1(), message: 'How are you?', likeCount: 1},
            ],
            newPostText: ''
        }
    },
    _rerenderEntireTree() {
        console.log('state was changed')
    },

    getState(){
        return this._state
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer //паттерн observer, похож на паттерн publisher-subscriber (по нему работает addEventListener, onClick, onChange...)
    },

    removeMessage(id) {
        //debugger
        this._state.messagesPage.messages = this._state.messagesPage.messages.filter(m => m.id !== id) //filter возвращает новый массив
        this._rerenderEntireTree(this._state);
    },//+
    setNewMessageText(newMessage) {
        this._state.messagesPage.newMessageText = newMessage;
        this._rerenderEntireTree(this._state);
    }, //+
    addNewMessage(message) {
        //debugger
        //можно вообще не передавать  извне текст сообщения, которое хотим добавить, а брать его из поля newMessageText (которое будет содержать актуальное значение, введенное в TextArea
        let newMessage: MessageType = {id: v1(), message: message}
        this._state.messagesPage.messages.push(newMessage)
        this._state.messagesPage.newMessageText = ''
        this._rerenderEntireTree(this._state);
    }, //+
    setNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._rerenderEntireTree(this._state);
    }, //+
    addNewPost() {
        //debugger
        //можно вообще не передавать  извне текст поста, который хотим добавить, а брать его из поля newPostText (которое будет содержать актуальное значение, введенное в TextArea
        let newPost: PostType = {id: v1(), message: this._state.profilePage.newPostText, likeCount: 0}
        this._state.profilePage.posts = [newPost, ...this._state.profilePage.posts]
        this._state.profilePage.newPostText = '';
        this._rerenderEntireTree(this._state);
        //так тоже работает, но новый пост добавится в конец списка постов:
        //state.profilePage.posts.push(newPost)
    }, //+
    removePost(id) {
        //debugger
        this._state.profilePage.posts = this._state.profilePage.posts.filter(p => p.id !== id)
        this._rerenderEntireTree(this._state);
    }, //+

    dispatch(action: any){

        this._state.profilePage = profileReduser(this._state.profilePage, action)
        this._state.messagesPage = dialogsReduser(this._state.messagesPage, action)
        this._rerenderEntireTree(this._state);
        //action - это объект, который описывает, какое действие нужно совершить.
        // Обязательно должно быть свойсво "тип" (например, type: 'ADD-POST') с описанием действия, которое нужно совершить.
//     if(action.type === ADD_POST) {
// //debugger
//         //можно вообще не передавать  извне текст поста, который хотим добавить, а брать его из поля newPostText (которое будет содержать актуальное значение, введенное в TextArea
//         let newPost: PostType = {id: v1(), message: this._state.profilePage.newPostText, likeCount: 0}
//         this._state.profilePage.posts = [newPost, ...this._state.profilePage.posts]
//         this._state.profilePage.newPostText = '';
//         this._rerenderEntireTree(this._state);
//         //так тоже работает, но новый пост добавится в конец списка постов:
//         //state.profilePage.posts.push(newPost)
//     }
//     else if (action.type === REMOVE_POST){
//         this._state.profilePage.posts = this._state.profilePage.posts.filter(p => p.id !== action.postForRemoveId) // при вызове в диспатч нужно передать action c доп. свойством "postForRemoveId"
//         this._rerenderEntireTree(this._state);
//     }
//     else if(action.type === SET_NEW_POST_TEXT) {
//         this._state.profilePage.newPostText = action.newPostText; // при вызове в диспатч нужно передать action c доп. свойством "newText"
//         this._rerenderEntireTree(this._state);
//     }
//     else if (action.type === ADD_MESSAGE) {
//         let newMessage: MessageType = {id: v1(), message: this._state.messagesPage.newMessageText}
//         this._state.messagesPage.messages.push(newMessage)
//         this._state.messagesPage.newMessageText = ''
//         this._rerenderEntireTree(this._state);
//     }
//     else if (action.type === REMOVE_MESSAGE){
//         this._state.messagesPage.messages = this._state.messagesPage.messages.filter(m => m.id !== action.messageForRemoveId) //filter возвращает новый массив
//         this._rerenderEntireTree(this._state);
//     }
//     else if (action.type === SET_NEW_MESSAGE_TEXT) {
//         this._state.messagesPage.newMessageText = action.newMessageText;
//         this._rerenderEntireTree(this._state);
//     }
    }
}





