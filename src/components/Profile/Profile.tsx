import React, {useState} from "react";
import classes from './Profile.module.css'
import MyPosts, {PostType} from "./MyPosts/MyPosts";
import mainLogo from "./../../images/main.png"
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfilePropsType = {
    posts: PostType[]
    newPostText: string
    addNewPost: (post: string) => void
    removePost: (id: string) => void
    setNewPostText:(NewPostText: string)=>void
    // inputTitle: string
    // inputSetTitle:(inputTitle:string)=> void;

}

function Profile (props: ProfilePropsType) {
    return (
        <div>
            <div>
                {/*добавил баттон просто для тестирования. Можно удалить*/}
                <button onClick={() => {props.addNewPost("Hello, I'm a new post from Profile")}}>Add post from Profile</button>
            </div>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                addNewPost={props.addNewPost}
                removePost={props.removePost}
                newPostText = {props.newPostText}
                setNewPostText={props.setNewPostText}
            />
        </div>
    )
}

export default Profile;