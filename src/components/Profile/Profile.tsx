import React, {useState} from "react";
import classes from './Profile.module.css'
import mainLogo from "./../../images/main.png"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {UserProfileType} from '../../redux/profile-reducer';

type ProfilePropsType = {
    profile: UserProfileType | undefined
}

function Profile (props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
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