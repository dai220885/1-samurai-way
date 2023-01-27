import React from "react";
import classes from './Post.module.css'

function Post() {
    return (
        <div className={classes.item}>
            post 1
            <div>
                <span>like</span>
            </div>
        </div>
    )
}

export default Post;