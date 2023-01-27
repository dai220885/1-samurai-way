import React from "react";
import logo from './../logo.svg';
import classes from './Header.module.css'

function Header () {
    return(
        <header className={classes.header}>
            <div></div>
            <img src={logo} alt = 'logo'></img>
        </header>
    )
}

export default Header;