import React from "react";
import classes from './Post.module.css'
// import ava from './../../../../../images/small.jpg'
import ava from './../../../../images/DAI.jpg'


type PostPropsType = {
    message: string;
    likeCount: number;
}

const Post: React.FC<PostPropsType> = (props) => {
    return (
        <div className={classes.item}>
            {props.message}
            <div>
                {/*<span><img src="./../../../../../images/small.ico" alt="avatar"/>{props.likeCount}</span>*/}
                <span><img src={ava} alt="avatar"/> likes: {props.likeCount} </span>
            </div>
        </div>
    )
}

export default Post;