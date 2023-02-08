import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {Button} from "../../Button/Button";
import {TextArea} from "../../TextArea/TextArea";

export type PostType = {
    id: number
    message: string
    likeCount: number
}

type MyPostsPropsType = {
    posts: Array<PostType>
    addNewPost: Function
    removePost: Function
    inputTitle: string
    inputSetTitle: (inputTitle: string) => void;

}

function MyPosts(props: MyPostsPropsType) {
    //let insertedText = "start";
    // const textChangeHandler = (event: any) => {
    //     console.log(insertedText)
    //     // 👇️ access textarea value
    //     insertedText = event.target.value;
    //     console.log(event.target.value);
    //     console.log(typeof insertedText)
    //     return insertedText
    // };

    let postsElements = props.posts.map((post, index) => {
        return (
            <>
                <Post key={index} message={post.message} likeCount={post.likeCount}/>
                <Button name={"-"} buttonCallBack={()=>props.removePost(post.id)}/>
            </>
        )
    })

    return (
        <div className={classes.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <TextArea title={props.inputTitle} setTitle={props.inputSetTitle}/>
                </div>
                <div>
                    {/*<button onClick={() => {props.addNewPost("new Posssssttt")}}>Add post</button>*/}
                    <Button name={"Add New Post (component)"} buttonCallBack={() => {
                        props.addNewPost(props.inputTitle)
                    }}/>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;