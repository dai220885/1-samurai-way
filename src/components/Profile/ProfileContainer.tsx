import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {setUserProfileThunkCreator} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/AuthRedirect';
import {compose} from 'redux';

class ProfileClassComponent extends React.Component <RootProfilePropsType> {
    // constructor(props:RootProfilePropsType) {
    //     super(props);
    // }
    componentDidUpdate(prevProps: Readonly<RootProfilePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        console.log('ProfileClassComponent.componentDidUpdate')
          //запрос на сервер выполнится только в том случае, если match.params.userId и profile?.userId будут разные, такое происходит, когда на страничке юзеров кликнули на аватарку, перешли на страничку профиля (с инфой о кликнутом юзере) и при этом кликаем на собственный логин(верхний правый угол), срабатывает componentDidUpdate, в роутинге меняется адрес на profile/наш_айдишник, но в пропсах еще предыдущий юзер сидит со своей айдишкой
        if (String(this.props.match.params.userId) !== String(this.props.profile?.userId)) {
            //axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.match.params.userId}`)
            this.props.setUserProfile(this.props.match.params.userId)
        }
    }

    componentDidMount() {
        //debugger
        console.log('ProfileClassComponent.componentDidMount')
        let userId = this.props.match.params.userId||'28386'
        this.props.setUserProfile(userId)
        //console.log(`userId: ${userId}`)
        //axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        //debugger
        // profileAPI.getProfile(userId).then(data => {this.props.setUserProfile(data)})
    }

    render() {
        //if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <Profile profile={this.props.profile}/>
        )
    }
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
    setUserProfile: (userId: string) => void;
}
type ProfileConnectPropsType = MapStateToPropsType & mapDispatchToPropsType
//типизируем параметры, полученные из урл
type PathParamsType ={
    userId: string
}
type OwnProfileContainerPropsType = {
}
type RootProfilePropsType = RouteComponentProps<PathParamsType> & ProfileConnectPropsType


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
})

const ProfileContainer = compose <React.ComponentType>(
    connect<MapStateToPropsType, mapDispatchToPropsType, OwnProfileContainerPropsType, AppStateType>(mapStateToProps, {setUserProfile: setUserProfileThunkCreator}),
    withRouter,
    withAuthRedirect
)(ProfileClassComponent)

export default ProfileContainer