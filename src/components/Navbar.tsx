import React from "react";
import classes from './Navbar.module.css'

function Navbar (props: any){
    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                Profile
            </div>
            <div className={`${classes.item} ${classes.active}`}>
                Message
            </div>
            <div className={classes.item}>
                News
            </div>
            <div className={classes.item}>
                Music
            </div>
            <div className={classes.item}>
                Settings
            </div>
        </nav>
    )
}

export default Navbar;