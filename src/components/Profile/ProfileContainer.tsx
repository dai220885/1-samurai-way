import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    getUserStatusThunkCreator,
    getUserProfileThunkCreator,
    updateStatusThunkCreator
} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/AuthRedirect';
import {compose} from 'redux';

class ProfileClassComponent extends React.Component <RootProfilePropsType> {
    // constructor(props:RootProfilePropsType) {
    //     super(props);
    // }
    componentDidUpdate(prevProps: Readonly<RootProfilePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        console.log('ProfileClassComponent.componentDidUpdate')
        //запрос на сервер выполнится только в том случае, если match.params.userId и profile?.userId будут разные, такое происходит, когда на страничке юзеров кликнули на аватарку, перешли на страничку профиля (с инфой о кликнутом юзере) и при этом кликаем на собственный логин(верхний правый угол) или на profile, срабатывает componentDidUpdate, в роутинге меняется адрес на profile/наш_айдишник или просто на profile/, но в пропсах еще предыдущий юзер сидит со своей айдишкой
       // debugger
        //let myId = '28386'

        //тестовый вариант, чтобы при отображении чужого профилотображать мой профиль п
        //let userId = this.props.match.params.userId
        let userId = this.props.match.params.userId || '28386'
        // if (prevProps.match.params.userId !== userId || undefined ){
        //     this.props.getUserProfile(userId)
        //     this.props.getUserStatus(userId)
        // }
        if (userId) {
            if (String(userId) !== String(this.props.profile?.userId)) {
                this.props.getUserProfile(userId)
                this.props.getUserStatus(userId)
            }
        }


        //if (String(this.props.match.params.userId) !== String(this.props.profile?.userId)) {
        //if (String(this.props.profile?.userId) !== myId) {
        //    let userId = this.props.match.params.userId || '28386'
            //this.props.getUserProfile(this.props.match.params.userId)
            //this.props.getUserStatus(this.props.match.params.userId)
         //   this.props.getUserProfile(userId)
        //    this.props.getUserStatus(userId)
        //}
    }

    componentDidMount() {
        //debugger
        console.log('ProfileClassComponent.componentDidMount')
        let userId = this.props.match.params.userId || '28386'
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)

    }

    render() {
        //if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <Profile
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        )
    }
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type mapDispatchToPropsType = {
    getUserProfile: (userId: string) => void;
    getUserStatus: (userId: string) => void;
    updateStatus: (newStatus: string) => void;
}
type ProfileConnectPropsType = MapStateToPropsType & mapDispatchToPropsType
//типизируем параметры, полученные из урл
type PathParamsType = {
    userId: string
}
type OwnProfileContainerPropsType = {}
type RootProfilePropsType = RouteComponentProps<PathParamsType> & ProfileConnectPropsType


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
})

const ProfileContainer = compose<React.ComponentType>(
    connect<MapStateToPropsType, mapDispatchToPropsType, OwnProfileContainerPropsType, AppStateType>(mapStateToProps, {
        getUserProfile: getUserProfileThunkCreator,
        getUserStatus: getUserStatusThunkCreator,
        updateStatus: updateStatusThunkCreator,
    }),
    withRouter,
    withAuthRedirect
)(ProfileClassComponent)

export default ProfileContainer