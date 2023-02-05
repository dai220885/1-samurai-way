//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs, {DialogType, MessageType} from "./components/Dialogs/Dialogs";

import {BrowserRouter, Route} from "react-router-dom";
import {PostType} from "./components/Profile/MyPosts/MyPosts";

type AppPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    posts: Array<PostType>
}

function App(props: AppPropsType) {
    let [posts, setPosts] = useState<Array<PostType>>(props.posts)
    let [count, setCount] = useState<number>(1)
    let [messages, setMessages] = useState<Array<MessageType>>(props.messages)

    function removeMessage (id: number){
        debugger
        let newMessages = messages.filter(m => m.id !==id)
        setMessages(newMessages)
    }
    function addNewMessage (message:string) {
        debugger
        let newMessages = [...messages];//копируем содержимое одного массива в другой
        let newMessage:MessageType = {id: messages.length+1, message: message}
        newMessages.push(newMessage)
        setMessages(newMessages)
    }

    function removePost (id: number){
       // debugger
        let newPosts = posts.filter(p => p.id !==id)
        setPosts(newPosts)
    }

    function addNewPost (message:string) {
        //debugger
        let newPosts= [...posts]
        let newPost:PostType = {id: posts.length+1, message: message, likeCount: posts.length}
        newPosts.push(newPost)
        setPosts(newPosts)
        //setCount(count-=1)
    }

    function addCount(){
        setCount(count+=1)
    }

    return (
        <BrowserRouter>


            <div className="app-wrapper">
                <div>
                    {count}
                </div>
                <div>
                    <button onClick={() => {addCount()}}>Add count</button>
                </div>
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={()=><Dialogs dialogs={props.dialogs} messages={messages} removeMessage={addNewMessage}/>}/>
                    <Route path="/profile" render={()=><Profile posts = {posts} addNewPost={addNewPost} />}/>
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
