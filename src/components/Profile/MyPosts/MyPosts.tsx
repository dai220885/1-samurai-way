import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

export type PostType = {
    id: number
    message: string
    likeCount: number
}

type MyPostsPropsType ={
    posts:Array<PostType>
    addNewPost: Function
}

function MyPosts(props: MyPostsPropsType) {


    let postsElements = props.posts.map((post)=>{
        return <Post message={post.message} likeCount={post.likeCount}/>
    })

    return (
        <div className={classes.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ></textarea>
                </div>
                <div>
                    <button onClick={() => {props.addNewPost("new Posssssttt")}}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;