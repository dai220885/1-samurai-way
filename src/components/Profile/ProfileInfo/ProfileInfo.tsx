import React from "react";
import classes from './ProfileInfo.module.css'
import mainLogo from "./../../../images/main.png"
import {UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileIstatus';
import ProfileStatusWithHooks from './ProfileIstatusWithHooks';
//import styles from '../../Users/Users.module.css';

type ProfileInfoPropsType = {
    profile: UserProfileType | undefined
    status: string
    updateStatus: (newStatus: string) => void
}

function ProfileInfo(props: ProfileInfoPropsType) {
    if (!props.profile) {
        return <Preloader/>
    } else {
        return (
            <div>
                {/*<div>*/}
                {/*    /!*<img src="https://i1.mybook.io/p/x480/bookset/0e/4e/0e4e921f-8dd7-4ba2-834d-7b1161992f83.png" alt='main logo'></img>*!/*/}
                {/*    <img className={classes.mainLogo} src={mainLogo} alt='main logo'></img>*/}
                {/*</div>*/}
                <div className={classes.descriptionBlock}>
                    {/*avatar + describtion*/}

                    <div>
                        {props.profile.aboutMe}
                    </div>
                    <div>
                        {  `userID: ${props.profile.userId}`}
                    </div>
                    <img src={props.profile.photos.large} alt="   photo   " className={classes.profilePhoto}/>
                    {/*<ProfileStatus status={props.status} updateStatus={props.updateStatus}/>*/}
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                </div>


            </div>
        )
    }
}

export default ProfileInfo;