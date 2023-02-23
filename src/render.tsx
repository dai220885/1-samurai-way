import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DialogType, MessageType} from './components/Dialogs/Dialogs';
import {PostType} from './components/Profile/MyPosts/MyPosts';
import {BrowserRouter} from 'react-router-dom';
import {addNewMessageTest, removeLastMessage} from './redux/state';

export let rerenderEntireTree = (state:any) => {
    ReactDOM.render(
        <BrowserRouter>
            {/*// <App dialogs={dialogs} messages={messages} posts={posts}/>,*/}
            {/*// document.getElementById('root')*/}
            <App state={state} addNewMessageTest={addNewMessageTest} removeMessageTest = {removeLastMessage}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}


