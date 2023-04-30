import React from "react";
import classes from './ProfileInfo.module.css'
import mainLogo from "./../../../images/main.png"
import {UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
//import styles from '../../Users/Users.module.css';

type ProfileStatusPropsType = {
    status: string
    //profile: UserProfileType | undefined
}

class ProfileStatus extends React.Component <ProfileStatusPropsType>{
    render() {
        return (
            <>
                <div>
                    <span>{this.props.status}</span>
                </div>
                <div>
                    <input value={this.props.status}/>
                </div>
            </>
        )
    }
}

export default ProfileStatus;