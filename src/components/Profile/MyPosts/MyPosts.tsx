import React, {useState} from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import {Button} from '../../Button/Button';
import {TextArea} from '../../TextArea/TextArea';

export type PostType = {
    id: string
    message: string
    likeCount: number
}

type MyPostsPropsType = {
    posts: PostType[]
    addNewPost: (post: string) => void
    removePost: (id: string) => void
    // inputTitle: string
    // inputSetTitle: (inputTitle: string) => void;

}

function MyPosts(props: MyPostsPropsType) {
    let [title, setTitle] = useState('') //стейт для хранения введенного текста в textArea
    //

    let postsElements = props.posts.map((post, index) => {
        let removePostOnClickHandler = () => props.removePost(post.id)
        return (
            <>
                <Post key={index} message={post.message} likeCount={post.likeCount}/>
                <Button name={'-'} buttonCallBack={removePostOnClickHandler}/>
            </>
        )
    })
    let textAreaCallBackHandler = () => {
        props.addNewPost(title);
        setTitle('')
    }
    let buttonCallBackHandler = () => {
        props.addNewPost(title);
        setTitle('')
    }
    return (
        <div className={classes.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <TextArea
                        title={title}
                        setTitle={setTitle}
                        textAreaCallBack={textAreaCallBackHandler}
                    />
                </div>
                <div>
                    {/*<button onClick={() => {props.addNewPost("new Posssssttt")}}>Add post</button>*/}
                    <Button
                        name={'Add New Post (component)'}
                        buttonCallBack={buttonCallBackHandler}
                    />
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;