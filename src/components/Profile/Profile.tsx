import React from "react";
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import mainLogo from "./../../images/main.png"
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile () {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts/>

        </div>
    )
}

export default Profile;