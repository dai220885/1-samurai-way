import React, {useState} from "react";
import classes from './Profile.module.css'
import MyPosts, {PostType} from "./MyPosts/MyPosts";
import mainLogo from "./../../images/main.png"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsType, StoreType} from '../../redux/store';
import MyPostsContainer from './MyPosts/MyPostsContainer';

type ProfilePropsType = {
    //store: StoreType //для контейнерной компоненты
    //posts: PostType[]
    //newPostText: string
    //dispatch: (action: ActionsType) => void
    //addNewPost: () => void
    //removePost: (id: string) => void
    //setNewPostText:(NewPostText: string)=>void
    // inputTitle: string
    // inputSetTitle:(inputTitle:string)=> void;

}

function Profile () {
    return (
        <div>
            <ProfileInfo/>
            {/*<MyPosts*/}
            {/*    posts={props.posts}*/}
            {/*    newPostText = {props.newPostText}*/}
            {/*    dispatch={props.dispatch}*/}
            {/*    //addNewPost={props.addNewPost}*/}
            {/*    //removePost={props.removePost}*/}
            {/*    //setNewPostText={props.setNewPostText}*/}
            {/*/>*/}
            <MyPostsContainer
                // store={props.store}
            />
        </div>
    )
}

export default Profile;