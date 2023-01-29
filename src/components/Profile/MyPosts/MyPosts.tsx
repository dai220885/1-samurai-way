import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

function MyPosts() {
    return (
        <div className={classes.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                <Post message={"Post 1"} likeCount={5}/>
                <Post message={"Post 2"} likeCount={9}/>
                <Post message={"Post 3"} likeCount={45}/>
                <Post message={"Post 4"} likeCount={7}/>
            </div>
        </div>
    )
}

export default MyPosts;