import React, {useState} from "react";
import classes from './Profile.module.css'
import mainLogo from "./../../images/main.png"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from './MyPosts/MyPostsContainer';

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