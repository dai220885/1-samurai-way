import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {DialogType, MessageType} from "./components/Dialogs/Dialogs";
import {PostType} from "./components/Profile/MyPosts/MyPosts";


let dialogs:Array<DialogType> = [
    {id: 1, name: "Alexandr"},
  ]
let messages: Array<MessageType> =[
    {id: 1, message: "Helloooo!!!"},
  ]
let posts: Array<PostType> =[
    {id: 1, message: "Hello, it's a post 1", likeCount: 7},
  ]
function addNewPost (message:string) {
    let newPost:PostType = {id: posts.length, message: message, likeCount: 0}
    posts.push(newPost)
}

test('renders learn react link', () => {
  render(<App dialogs={dialogs} messages={messages}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
