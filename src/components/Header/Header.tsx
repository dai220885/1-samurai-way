import React from 'react';
import logo from '../../logo.svg';
import classes from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {AuthUserDataType} from '../../redux/auth-reducer';

function Header(props: AuthUserDataType) {
    return (
        <header className={classes.header}>
            <div></div>
            <img src={logo} alt="logo"></img>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <NavLink to={'/profile/'+ props.id}>{props.login}</NavLink>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header;