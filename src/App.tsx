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
    //posts: Array<PostType>
}

function App(props: AppPropsType) {
    let [posts, setPosts] = useState<Array<PostType>>([
        {id: 1, message: "Hello, it's a post 1", likeCount: 7},
        {id: 2, message: "Hi, it's a post 2", likeCount: 3},
        {id: 3, message: "By-By", likeCount: 4},
        {id: 4, message: "How are you?", likeCount: 1},
    ])
    function removePost (id: number){
       // debugger
        let newPosts = posts.filter(p => p.id !==id)
        setPosts(newPosts)
    }

    function addNewPost (message:string) {
        debugger
        let newPost:PostType = {id: posts.length+1, message: message, likeCount: posts.length}
        posts.push(newPost)
        setPosts(posts)
        //setCount(count-=1)
    }

    let [count, setCount] = useState<number>(1)

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
                    <Route path="/dialogs" render={()=><Dialogs dialogs={props.dialogs} messages={props.messages}/>}/>
                    <Route path="/profile" render={()=><Profile posts = {posts} addNewPost={addNewPost}/>}/>
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
