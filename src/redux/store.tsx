// import {v1} from 'uuid';
// import profileReducer, {
//     addPostAC, ProfilePageType, ProfileReducerActionType,
//     removePostAC,
//     setNewPostTextAC
// } from './profile-reducer';
// import dialogsReducer, {DialogsReducerActionType, MessagePageType} from './dialogs-reducer';
// import sidebarReducer from './sidebar-reducer';
//
// //subscribe вызывается в index.tsx и получает в качестве коллбэка функцию rerenderEntireTree (уже настоящую, которая перерисовывает все дерево)) Получив коллбэк subscribe присваивает его в локальную для store.tsx функцию rerenderEntireTree
//
// export type SidebarType = {}
//
// export type StateType = {
//     profilePage: ProfilePageType
//     messagesPage: MessagePageType
//     sidebar: SidebarType
// }
//
// export type ActionsType =
//     ProfileReducerActionType
//     | DialogsReducerActionType
//
// export type StoreType = {
//     _state: StateType
//     _rerenderEntireTree: (state: StateType) => void //в видео этоо _callSubscriber
//     getState: () => StateType
//     subscribe: (observer: (state: StateType) => void) => void
//     dispatch: (action: ActionsType) => void
//     //setNewPostText: (newText: string) => void
//     //removeMessage: (id: string) => void
//     //setNewMessageText: (newMessage: string) => void
//     //addNewMessage: (message: string) => void
//     //addNewPost: () => void
//     //removePost: (id: string) => void
// }
//
// export const store = {
//     _state: {
//         messagesPage: {
//             dialogs: [
//                 {id: v1(), name: 'Alexandr'},
//                 {id: v1(), name: 'Victor'},
//                 {id: v1(), name: 'Sergey'},
//                 {id: v1(), name: 'Vladimir'},
//                 {id: v1(), name: 'Petr'},
//                 {id: v1(), name: 'Galina'},
//             ],
//             messages: [
//                 {id: v1(), message: 'Helloooo!!!'},
//                 {id: v1(), message: 'How are you?'},
//                 {id: v1(), message: 'Good morning, bro'},
//                 {id: v1(), message: 'Good Buy!!'},
//                 {id: v1(), message: 'Good Buy!!'},
//                 {id: v1(), message: 'Good Buy!!'},
//                 {id: v1(), message: 'Good Buy!!'},
//             ],
//             newMessageText: ''
//         },
//         profilePage: {
//             posts: [
//                 {id: v1(), message: 'Hello, it\'s a post 1', likeCount: 7},
//                 {id: v1(), message: 'Hi, it\'s a post 2', likeCount: 3},
//                 {id: v1(), message: 'By-By', likeCount: 4},
//                 {id: v1(), message: 'How are you?', likeCount: 1},
//             ],
//             newPostText: ''
//         },
//         sidebar: {}
//     },
//     _rerenderEntireTree() {
//         console.log('state was changed')
//     },
//
//     getState() {
//         return this._state
//     },
//     subscribe(observer: any) {
//         this._rerenderEntireTree = observer //паттерн observer, похож на паттерн publisher-subscriber (по нему работает addEventListener, onClick, onChange...)//изменит поведение метода '_rerenderEntireTree' на функцию 'observer', которая придет в качестве параметра
//     },
//
//     dispatch(action: any) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action)
//         //this._rerenderEntireTree(this._state);
//     },
// }
//
//
//
//
//
export {}