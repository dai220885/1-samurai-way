import React, {useState} from "react";
import classes from './Profile.module.css'
import MyPosts, {PostType} from "./MyPosts/MyPosts";
import mainLogo from "./../../images/main.png"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsType} from '../../redux/state';

type ProfilePropsType = {
    posts: PostType[]
    newPostText: string
    dispatch: (action: ActionsType) => void
    //addNewPost: () => void
    //removePost: (id: string) => void
    //setNewPostText:(NewPostText: string)=>void
    // inputTitle: string
    // inputSetTitle:(inputTitle:string)=> void;

}

function Profile (props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                newPostText = {props.newPostText}
                dispatch={props.dispatch}
                //addNewPost={props.addNewPost}
                //removePost={props.removePost}
                //setNewPostText={props.setNewPostText}
            />
        </div>
    )
}

export default Profile;