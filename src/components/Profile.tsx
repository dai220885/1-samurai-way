import React from "react";
import classes from './Profile.module.css'

function Profile () {
    return (
        <div className={classes.content}>
            Main content
            <div>
                {/*<img src="https://i1.mybook.io/p/x480/bookset/0e/4e/0e4e921f-8dd7-4ba2-834d-7b1161992f83.png" alt='main logo'></img>*/}
                <img src='./../../images/DAI_3889.JPG' alt='main logo family'></img>
                {/*<img src='./DAI_3889.JPG' alt='main logo family'></img>*/}
            </div>
            <div>
                avatar
            </div>
            <div>
                My posts
                <div>
                    New post
                </div>
            </div>
            <div className={classes.item}>
                post 1
            </div>
            <div className={classes.item}>
                post 2
            </div>

        </div>
    )
}

export default Profile;