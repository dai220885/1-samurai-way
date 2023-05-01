import React, {ChangeEvent} from 'react';
import classes from './ProfileInfo.module.css'
import mainLogo from './../../../images/main.png'
import {UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
//import styles from '../../Users/Users.module.css';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (newStatus: string) => void
    //profile: UserProfileType | undefined
}

class ProfileStatus extends React.Component <ProfileStatusPropsType> {

    state = {
        editMode: false,
        status: this.props.status
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
        );
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {status: e.currentTarget.value}
        )
    }
    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>STATUS: {this.props.status || '____'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            value={this.state.status}
                            onChange={this.onStatusChange}
                            onBlur={this.deactivateEditMode}
                            autoFocus={true}/>
                    </div>
                }

            </>
        )
    }
}

export default ProfileStatus;