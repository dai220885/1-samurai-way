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
    let [p, setP] = useState<Array<PostType>>([
        {id: 1, message: "Hello, it's a post 1", likeCount: 7},
        {id: 1, message: "Hi, it's a post 2", likeCount: 3},
        {id: 1, message: "By-By", likeCount: 4},
        {id: 1, message: "How are you?", likeCount: 1},
    ])

    function addNewPost (message:string) {
        //debugger
        let newPost:PostType = {id: p.length, message: message, likeCount: 0}
        p.push(newPost)
        setP(p)
    }
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={()=><Dialogs dialogs={props.dialogs} messages={props.messages}/>}/>
                    <Route path="/profile" render={()=><Profile posts = {p} addNewPost={addNewPost}/>}/>
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
