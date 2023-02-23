import {DialogType, MessageType} from '../components/Dialogs/Dialogs';
import {PostType} from '../components/Profile/MyPosts/MyPosts';
import {v1} from 'uuid';
import {rerenderEntireTree} from '../render';

export type stateType = {
    profilePage: {
        posts: PostType[]
    }
    messagesPage:{
        dialogs: DialogType[]
        messages: MessageType[]
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
        ]
    },
    profilePage: {
        posts: [
            {id: v1(), message: "Hello, it's a post 1", likeCount: 7},
            {id: v1(), message: "Hi, it's a post 2", likeCount: 3},
            {id: v1(), message: "By-By", likeCount: 4},
            {id: v1(), message: "How are you?", likeCount: 1},
        ]
    }
}
export function removeLastMessage() {
    state.messagesPage.messages.pop()
    rerenderEntireTree(state);
}
export let addNewMessageTest = (message: string) => {
    //debugger
    let newMessage: MessageType = {id: v1(), message: message}
    state.messagesPage.messages.push(newMessage)
    rerenderEntireTree(state);
}

export default state;