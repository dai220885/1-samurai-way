import React from "react";
import classes from './ProfileInfo.module.css'
import mainLogo from "./../../../images/main.png"

function ProfileInfo() {
    return (
        <div>
            <div>
                {/*<img src="https://i1.mybook.io/p/x480/bookset/0e/4e/0e4e921f-8dd7-4ba2-834d-7b1161992f83.png" alt='main logo'></img>*/}
                <img className={classes.mainLogo} src={mainLogo} alt='main logo'></img>
            </div>
            <div className={classes.descriptionBlock}>
                avatar + describtion
            </div>


        </div>
    )
}

export default ProfileInfo;