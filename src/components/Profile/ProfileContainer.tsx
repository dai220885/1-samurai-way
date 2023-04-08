import React, {useState} from 'react';
import classes from './Profile.module.css'
import mainLogo from './../../images/main.png'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profile from './Profile';
import axios from 'axios';
import {UserType} from '../../redux/users-reducer';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {setUserProfile, UserProfileType} from '../../redux/profile-reducer';

class ProfileContainer extends React.Component <RootProfilePropsType> {
    // constructor(props:RootProfilePropsType) {
    //     super(props);
    // }
    componentDidUpdate(prevProps: Readonly<RootProfilePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        console.log('ProfileContainer.componentDidUpdate')
    }

    componentDidMount() {
        console.log('ProfileContainer.componentDidMount')
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                //debugger
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}
type RootProfilePropsType = MapStateToPropsType & mapDispatchToPropsType
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
})

type mapDispatchToPropsType = {
    setUserProfile: (profile: UserProfileType) => void;
}

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);