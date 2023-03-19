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
import {ActionsType, StateType, StoreType} from './redux/store';
import {v1} from 'uuid';
import DialogsContainer from './components/Dialogs/DialogsContainer';

// старая версия проппсов
// type AppPropsType = {
//     state: stateType
//     addNewMessage:(message: string) => void
//     removeMessage:(id: string)=>void
//     addNewPost: (post: string)=>void
//     removePost: (id: string) =>void
//     setNewPostText:(NewPostText: string)=>void
//     setNewMessageText:(NewMessageText: string)=>void
// }

export type AppPropsType = {
    store: StoreType
    state:StateType
    dispatch: (action: ActionsType) => void
}
const App: React.FC = () => {
    //debugger
    // let [posts, setPosts] = useState<PostType[]>(props.state.profilePage.posts)
    let [count, setCount] = useState<number>(1)
    //let [messages, setMessages] = useState<MessageType[]>(props.state.messagesPage.messages)
    // let [title, setTitle] = useState("")
    // function removeMessage(id: string) {
    //     //debugger
    //     let newMessages = messages.filter(m => m.id !== id) //filter возвращает новый массив
    //     setMessages(newMessages)
    // }
    //
    // function removeLastMessage(id: string) {
    //     let newMessages = [...messages]
    //     newMessages.pop()
    //     setMessages(newMessages)
    // }
    //
    // function addNewMessage(message: string) {
    //     //debugger
    //     let newMessage: MessageType = {id: v1(), message: message}
    //     let newMessages = [...messages, newMessage];//копируем содержимое одного массива в другой и добавляем новый элемент
    //     //newMessages.push(newMessage) добавили новый объект в предыдущей строке
    //     setMessages(newMessages)
    // }
    //
    // function removePost(id: string) {
    //     //debugger
    //     let newPosts = posts.filter(p => p.id !== id)
    //     setPosts(newPosts)
    // }
    //
    // function addNewPost(message: string) {
    //     //debugger
    //     let newPost: PostType = {id: v1(), message: message, likeCount: 0}
    //     let newPosts = [newPost, ...posts]
    //     setPosts(newPosts)
    //     //setTitle("")
    //     //setCount(count-=1)
    // }
    function addCount() {
        setCount(count += 1)
    }

    //const state = props.state;
    return (
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
                <Route
                    path="/dialogs"
                    render={() =>
                        <DialogsContainer
                            //store={props.store}
                            //dialogs={state.messagesPage.dialogs}
                            //messages={state.messagesPage.messages}
                            //newMessageText={state.messagesPage.newMessageText}
                            //dispatch={props.dispatch}
                            //addNewMessage={props.store.addNewMessage.bind(props.store)}
                            //removeMessage={props.store.removeMessage.bind(props.store)}
                            //setNewMessageText={props.store.setNewMessageText.bind(props.store)}
                        />}
                />
                <Route
                    path="/profile"
                    render={() =>
                        <Profile
                            //store={props.store} // для контейнерной компоненты
                            //posts={state.profilePage.posts}
                            //dispatch={props.dispatch}
                            //addNewPost={props.store.addNewPost.bind(props.store)}
                            //removePost={props.store.removePost.bind(props.store)}
                            //newPostText={state.profilePage.newPostText}
                            //setNewPostText={props.store.setNewPostText.bind(props.store)}
                        />}
                />
                {/*<Route path="/news" component={News}/>*/}
                {/*<Route path="/music" component={Music}/>*/}
                {/*<Route path="/settings" component={Settings}/>*/}
                {/*<Profile/>*/}
                {/*<Dialogs/>*/}
            </div>
        </div>
    );
}

export default App;
