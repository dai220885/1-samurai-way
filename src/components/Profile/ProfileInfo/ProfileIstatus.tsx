import React from 'react';
import classes from './ProfileInfo.module.css'
import mainLogo from './../../../images/main.png'
import {UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
//import styles from '../../Users/Users.module.css';

type ProfileStatusPropsType = {
    status: string
    //profile: UserProfileType | undefined
}

class ProfileStatus extends React.Component <ProfileStatusPropsType> {
    state = {
        editMode: false
    }
    //используем стрелочную функцию, чтобы не нужно было использовать bind при передаче метода в качестве колбэка
    activateEditMode = () => {
        //debugger
        this.setState(
            {editMode: true}
        )
    }
    deactivateEditMode = () => {
        //debugger
        this.setState(
            {editMode: false}
        )
    }
    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            value={this.props.status}
                            onBlur={this.deactivateEditMode}
                            autoFocus={true}/>
                    </div>
                }

            </>
        )
    }
}

export default ProfileStatus;