//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs, {DialogType, MessageType} from './components/Dialogs/Dialogs';

import {BrowserRouter, Route} from 'react-router-dom';
import {PostType} from './components/Profile/MyPosts/MyPosts';
import {TextArea} from './components/TextArea/TextArea';
import {stateType} from './redux/state';
import {v1} from 'uuid';

type AppPropsType = {
    state: stateType
}

function App(props: AppPropsType) {
    let [posts, setPosts] = useState<PostType[]>(props.state.profilePage.posts)
    let [count, setCount] = useState<number>(1)
    let [messages, setMessages] = useState<MessageType[]>(props.state.messagesPage.messages)

    // let [title, setTitle] = useState("")

    function removeMessage(id: string) {
        //debugger
        let newMessages = messages.filter(m => m.id !== id) //filter возвращает новый массив
        setMessages(newMessages)
    }

    function removeLastMessage(id: string) {
        let newMessages = [...messages]
        newMessages.pop()
        setMessages(newMessages)
    }

    function addNewMessage(message: string) {
        //debugger
        let newMessage: MessageType = {id: v1(), message: message}
        let newMessages = [...messages, newMessage];//копируем содержимое одного массива в другой и добавляем новый элемент
        //newMessages.push(newMessage) добавили новый объект в предыдущей строке
        setMessages(newMessages)
    }

    function removePost(id: string) {
        //debugger
        let newPosts = posts.filter(p => p.id !== id)
        setPosts(newPosts)
    }

    function addNewPost(message: string) {
        //debugger
        let newPost: PostType = {id: v1(), message: message, likeCount: posts.length}
        let newPosts = [newPost, ...posts]
        setPosts(newPosts)
        //setTitle("")
        //setCount(count-=1)
    }

    function addCount() {
        setCount(count += 1)
    }

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <div>
                    {count}
                </div>
                <div>
                    <button onClick={() => {
                        addCount()
                    }}>Add count
                    </button>
                </div>
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={() => <Dialogs dialogs={props.state.messagesPage.dialogs}
                                                                  messages={messages}
                                                                  addNewMessage={addNewMessage}
                                                                  removeMessage={removeLastMessage}
                        /*buttonCallBack = {[removeLastMessage, addNewMessage]}*//>}/>
                    <Route path="/profile" render={() => <Profile posts={posts}
                                                                  addNewPost={addNewPost}
                                                                  removePost={removePost}/>}/>
                    {/*<Route path="/news" component={News}/>*/}
                    {/*<Route path="/music" component={Music}/>*/}
                    {/*<Route path="/settings" component={Settings}/>*/}
                    {/*<Profile/>*/}
                    {/*<Dialogs/>*/}
                </div>
            </div>
        </BrowserRouter>

    );
}

export default App;
