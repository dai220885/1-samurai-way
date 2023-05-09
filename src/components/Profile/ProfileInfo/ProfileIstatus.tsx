import React, {ChangeEvent} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (newStatus: string) => void
    //profile: UserProfileType | undefined
}

type ProfileStatusLocalStateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component <ProfileStatusPropsType> {

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<ProfileStatusLocalStateType>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            //debugger
            this.setState(
                {status: this.props.status}
            )
        }
    }

    state: ProfileStatusLocalStateType = {
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