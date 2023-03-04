import {DialogType, MessageType} from '../components/Dialogs/Dialogs';
import {PostType} from '../components/Profile/MyPosts/MyPosts';
import {v1} from 'uuid';

//subscribe вызывается в index.tsx и получает в качестве коллбэка функцию rerenderEntireTree (уже настоящую, которая перерисовывает все дерево)) Получив коллбэк subscribe присваивает его в локальную для state.tsx функцию rerenderEntireTree

export type stateType = {
    profilePage: {
        posts: PostType[]
        newPostText: string
    }
    messagesPage: {
        dialogs: DialogType[]
        messages: MessageType[]
        newMessageText: string
    }
}

export type storeType = {
    _state: stateType
    setNewPostText: (newText: string) => void
    removeMessage: (id: string) => void
    setNewMessageText: (newMessage: string) => void
    addNewMessage: (message: string) => void
    addNewPost: (message: string) => void
    removePost: (id: string) => void
    _rerenderEntireTree: () => void
    subscribe: (observer: () => void) => void
    getState: () => stateType
}

export const store: storeType = {
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
    setNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._rerenderEntireTree();
    },
    removeMessage(id) {
        //debugger
        this._state.messagesPage.messages = this._state.messagesPage.messages.filter(m => m.id !== id) //filter возвращает новый массив
        this._rerenderEntireTree();
    },
    setNewMessageText(newMessage) {
        this._state.messagesPage.newMessageText = newMessage;
        this._rerenderEntireTree();
    },
    addNewMessage(message) {
        //debugger
        //можно вообще не передавать  извне текст сообщения, которое хотим добавить, а брать его из поля newMessageText (которое будет содержать актуальное значение, введенное в TextArea
        let newMessage: MessageType = {id: v1(), message: message}
        this._state.messagesPage.messages.push(newMessage)
        this._state.messagesPage.newMessageText = ''
        this._rerenderEntireTree();
    },
    addNewPost(message) {
        //debugger
        //можно вообще не передавать  извне текст поста, который хотим добавить, а брать его из поля newPostText (которое будет содержать актуальное значение, введенное в TextArea
        let newPost: PostType = {id: v1(), message: message, likeCount: 0}
        this._state.profilePage.posts = [newPost, ...this._state.profilePage.posts]
        this._state.profilePage.newPostText = '';
        this._rerenderEntireTree();
        //так тоже работает, но новый пост добавится в конец списка постов:
        //state.profilePage.posts.push(newPost)
    },
    removePost(id) {
        //debugger
        this._state.profilePage.posts = this._state.profilePage.posts.filter(p => p.id !== id)
        this._rerenderEntireTree();
    },
    _rerenderEntireTree() {
        console.log('state was changed')
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer //паттерн observer, похож на паттерн publisher-subscriber (по нему работает addEventListener, onClick, onChange...)
    },
    getState(){
        return this._state
    }
}



