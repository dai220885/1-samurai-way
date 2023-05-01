import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {UserProfileType} from '../../redux/profile-reducer';

type ProfilePropsType = {
    profile: UserProfileType | undefined
    status: string
    updateStatus: (newStatus: string) => void
}

function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;