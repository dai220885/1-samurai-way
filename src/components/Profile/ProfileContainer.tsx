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
import {RouteComponentProps, withRouter} from 'react-router-dom';

class ProfileClassComponent extends React.Component <RootProfilePropsType> {
    // constructor(props:RootProfilePropsType) {
    //     super(props);
    // }
    componentDidUpdate(prevProps: Readonly<RootProfilePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        console.log('ProfileClassComponent.componentDidUpdate')
    }

    componentDidMount() {
        //debugger
        console.log('ProfileClassComponent.componentDidMount')
        let userId = this.props.match.params.userId||'2'
        console.log(`userId: ${userId}`)
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
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

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
    setUserProfile: (profile: UserProfileType) => void;
}
type ProfileConnectPropsType = MapStateToPropsType & mapDispatchToPropsType
type PathParamsType ={
    userId: string
} //типизируем параметры, полученные из урл
type RootProfilePropsType = RouteComponentProps<PathParamsType> & ProfileConnectPropsType
let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
})

const ProfileWithRouter = withRouter(ProfileClassComponent)
const ProfileContainer = connect(mapStateToProps, {setUserProfile})(ProfileWithRouter);
export default ProfileContainer