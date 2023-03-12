import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DialogType, MessageType} from './components/Dialogs/Dialogs';
import {PostType} from './components/Profile/MyPosts/MyPosts';
import {StateType, store} from './redux/state';
import {BrowserRouter} from 'react-router-dom';

import './index.css';


let rerenderEntireTree = (state:StateType) => {
    ReactDOM.render(
        <BrowserRouter>
            {/*// <App dialogs={dialogs} messages={messages} posts={posts}/>,*/}
            {/*// document.getElementById('root')*/}
            {/*<App*/}
            {/*    state={store._state}*/}
            {/*    addNewMessage={store.addNewMessage}*/}
            {/*    removeMessage = {store.removeMessage}*/}
            {/*    addNewPost = {store.addNewPost}*/}
            {/*    removePost={store.removePost}*/}
            {/*    setNewPostText = {store.setNewPostText}*/}
            {/*    setNewMessageText={store.setNewMessageText}*/}
            {/*/>*/}
            <App store={store} state = {state} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}



rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree)


/*
let dialogs: Array<DialogType> = [
    {id: 1, name: "Alexandr"},
    {id: 2, name: "Victor"},
    {id: 3, name: "Sergey"},
    {id: 4, name: "Vladimir"},
    {id: 5, name: "Petr"},
    {id: 6, name: "Galina"},
]
let messages: Array<MessageType> = [
    {id: 1, message: "Helloooo!!!"},
    {id: 2, message: "How are you?"},
    {id: 3, message: "Good morning, bro"},
    {id: 4, message: "Good Buy!!"},
    {id: 5, message: "Good Buy!!"},
    {id: 6, message: "Good Buy!!"},
    {id: 7, message: "Good Buy!!"},
]
let posts: Array<PostType>= [
    {id: 1, message: "Hello, it's a post 1", likeCount: 7},
    {id: 2, message: "Hi, it's a post 2", likeCount: 3},
    {id: 3, message: "By-By", likeCount: 4},
    {id: 4, message: "How are you?", likeCount: 1},
]
//*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// let allData: AllDataType = {
//     dialogs: [
//         {id: 1, name: "Alexandr"},
//         {id: 2, name: "Victor"},
//         {id: 3, name: "Sergey"},
//         {id: 4, name: "Vladimir"},
//         {id: 5, name: "Petr"},
//         {id: 6, name: "Galina"},
//
//     ],
//     messages: [
//         {id: 1, message: "Helloooo!!!"},
//         {id: 2, message: "How are you?"},
//         {id: 3, message: "Good morning, bro"},
//         {id: 4, message: "Good Buy!!"},
//         {id: 4, message: "Good Buy!!"},
//         {id: 4, message: "Good Buy!!"},
//         {id: 4, message: "Good Buy!!"},
//
//     ],
//     posts: [
//         {id: 1, message: "Hello, it's a post 1", likeCount: 7},
//         {id: 1, message: "Hi, it's a post 2", likeCount: 3},
//         {id: 1, message: "By-By", likeCount: 4},
//         {id: 1, message: "How are you?", likeCount: 1},
//     ]
// }
