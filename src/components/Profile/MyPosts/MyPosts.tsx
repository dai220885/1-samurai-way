import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";


type PostType = {
    id: number
    message: string
    likeCount: number
}

function MyPosts() {
    let posts: Array<PostType> = [
        {id: 1, message: "Hello, it's a post 1", likeCount: 7},
        {id: 1, message: "Hi, it's a post 2", likeCount: 3},
        {id: 1, message: "By-By", likeCount: 4},
        {id: 1, message: "How are you?", likeCount: 1},
    ]

    let postsElements = posts.map((post)=>{
        return <Post message={post.message} likeCount={post.likeCount}/>
    })

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
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;