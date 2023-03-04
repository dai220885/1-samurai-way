import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {DialogType, MessageType} from "./components/Dialogs/Dialogs";
import {PostType} from "./components/Profile/MyPosts/MyPosts";
import {store} from './redux/state'
import {v1} from 'uuid';


let dialogs: DialogType[] = [
    {id: v1(), name: "Alexandr"},
  ]
let messages: Array<MessageType> =[
    {id: v1(), message: "Helloooo!!!"},
  ]
let posts: Array<PostType> =[
    {id: v1(), message: "Hello, it's a post 1", likeCount: 7},
  ]
function addNewPost (message:string) {
    let newPost:PostType = {id: v1(), message: message, likeCount: 0}
    posts.push(newPost)
}

// test('renders learn react link', () => {
//   render(<App state={state}/>);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
