import React, {useState} from "react";
import classes from './Profile.module.css'
import MyPosts, {PostType} from "./MyPosts/MyPosts";
import mainLogo from "./../../images/main.png"
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfilePropsType = {
    posts: Array<PostType>
    addNewPost: Function

}

function Profile (props: ProfilePropsType) {
    return (
        <div>
            <div>
                <button onClick={() => {props.addNewPost("Hello I'm a new post from Profile")}}>Add post from Profile</button>
            </div>
            <ProfileInfo/>
            <MyPosts posts={props.posts} addNewPost={props.addNewPost}/>

        </div>
    )
}

export default Profile;