import {DialogType, MessageType} from '../components/Dialogs/Dialogs';
import {PostType} from '../components/Profile/MyPosts/MyPosts';
import {v1} from 'uuid';

let rerenderEntireTree = () =>{
    console.log('state was changed')
}

//subscribe вызывается в index.tsx и получает в качестве коллбэка функцию rerenderEntireTree (уже настоящую, которая перерисовывает все дерево)) Получив коллбэк subscribe присваивает его в локальную для state.tsx функцию rerenderEntireTree
export const subscribe = (observer:()=>void) =>{
    rerenderEntireTree = observer //паттерн observer, похож на паттерн publisher-subscriber (по нему работает addEventListener, onClick, onChange...)
}

export type stateType = {
    profilePage: {
        posts: PostType[]
        newPostText:string
    }
    messagesPage:{
        dialogs: DialogType[]
        messages: MessageType[]
        newMessageText: string
    }
}

let state: stateType = {
    messagesPage: {
        dialogs: [
            {id: v1(), name: "Alexandr"},
            {id: v1(), name: "Victor"},
            {id: v1(), name: "Sergey"},
            {id: v1(), name: "Vladimir"},
            {id: v1(), name: "Petr"},
            {id: v1(), name: "Galina"},
        ],
        messages: [
            {id: v1(), message: "Helloooo!!!"},
            {id: v1(), message: "How are you?"},
            {id: v1(), message: "Good morning, bro"},
            {id: v1(), message: "Good Buy!!"},
            {id: v1(), message: "Good Buy!!"},
            {id: v1(), message: "Good Buy!!"},
            {id: v1(), message: "Good Buy!!"},
        ],
        newMessageText: ''
    },
    profilePage: {
        posts: [
            {id: v1(), message: "Hello, it's a post 1", likeCount: 7},
            {id: v1(), message: "Hi, it's a post 2", likeCount: 3},
            {id: v1(), message: "By-By", likeCount: 4},
            {id: v1(), message: "How are you?", likeCount: 1},
        ],
        newPostText: ''
    }
}

export const setNewPostText = (newText: string) =>{
    state.profilePage.newPostText = newText;
    rerenderEntireTree();
}

export const removeLastMessage = () =>{
    state.messagesPage.messages.pop()
    rerenderEntireTree();
}

export const removeMessage = (id: string) => {
    //debugger
    state.messagesPage.messages = state.messagesPage.messages.filter(m => m.id !== id) //filter возвращает новый массив
    rerenderEntireTree();
}

export const setNewMessageText = (newMessage: string) =>{
    state.messagesPage.newMessageText = newMessage;
    rerenderEntireTree();
}

export const addNewMessage = (message: string) => {
    //debugger
    //можно вообще не передавать  извне текст сообщения, которое хотим добавить, а брать его из поля newMessageText (которое будет содержать актуальное значение, введенное в TextArea
    let newMessage: MessageType = {id: v1(), message: message}
    state.messagesPage.messages.push(newMessage)
    state.messagesPage.newMessageText = ''
    rerenderEntireTree();
}

export const addNewPost = (message: string) =>{
    //debugger
    //можно вообще не передавать  извне текст поста, который хотим добавить, а брать его из поля newPostText (которое будет содержать актуальное значение, введенное в TextArea
    let newPost: PostType = {id: v1(), message: message, likeCount: 0}
    state.profilePage.posts = [newPost, ...state.profilePage.posts]
    state.profilePage.newPostText = '';
    rerenderEntireTree();
    //так тоже работает, но новый пост добавится в конец списка постов:
    //state.profilePage.posts.push(newPost)
}

export const removePost = (id: string)=> {
    //debugger
    state.profilePage.posts = state.profilePage.posts.filter(p => p.id !== id)
    rerenderEntireTree();
}

export default state;