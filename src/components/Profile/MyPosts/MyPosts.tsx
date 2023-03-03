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
    newPostText: string
    setNewPostText: (newPostText: string)=> void
    // inputTitle: string
    // inputSetTitle: (inputTitle: string) => void;

}

function MyPosts(props: MyPostsPropsType) {
    //let [title, setTitle] = useState('') //стейт для хранения введенного текста в textArea

    let postsElements = props.posts.map((post) => {
        let removePostOnClickHandler = () => props.removePost(post.id)
        return (
            <div key={post.id}>
                <Post message={post.message} likeCount={post.likeCount}/>
                <Button name={'-'} buttonCallBack={removePostOnClickHandler}/>
            </div>
        )
    })
    const addNewPostCallBackHandler = () => {
        props.addNewPost(props.newPostText);
        //setTitle('')
    }

    return (
        <div className={classes.postBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <TextArea
                        placeholder={'add new post'}
                        value={props.newPostText}
                        setValue={props.setNewPostText}
                        textAreaCallBack={addNewPostCallBackHandler}
                    />
                </div>
                <div>
                    {/*<button onClick={() => {props.addNewPost("new Posssssttt")}}>Add post</button>*/}
                    <Button
                        name={'Add New Post (component)'}
                        buttonCallBack={addNewPostCallBackHandler}
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