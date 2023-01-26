import React from "react";
import logo from './../logo.svg';

function Header () {
    return(
        <header className='header'>
            <div></div>
            <img src={logo} alt = 'logo'></img>
        </header>
    )
}

export default Header;