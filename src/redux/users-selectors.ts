import {AppStateType} from './redux-store';
import {createSelector} from 'reselect';
import {UserType} from './users-reducer';

//функции-селекторы, которые достают из стейта нужные нам части
export const getUsers = (state: AppStateType) => state.userPage.users //просто достает часть из стейта

export const getUsersSelector = (state: AppStateType) => getUsers(state).filter(el => true)//используя предыдущий селектор фейково фильтрует полученные данные
//первым параметром (в качестве зависимости) передаем примитивный селектор, результат его работы попадает в функцию, записанную во втором параметре. createSelector нужен, чтобы не перерисовывать компоненту, если не поменялось то, что находится в зависимостях
export const getUsersSuperSelector = createSelector (getUsers,(users: UserType[])=>users.filter(el => true))

export const getPageSize = (state: AppStateType) => state.userPage.pageSize
export const getTotalUsersCount = (state: AppStateType) => state.userPage.totalUsersCount
export const getCurrentPage = (state: AppStateType) => state.userPage.currentPage
export const getIsFetching = (state: AppStateType) => state.userPage.isFetching
export const getIsFollowingInProgress = (state: AppStateType) => state.userPage.isFollowingInProgress

//просто демонстративный супер-селектор, чтобы проиллюстрировать, как передаются параетры, когда в зависимостях несколько примитивных селекторов:
export const getUsersSuperSelectorDemo = createSelector (getUsers, getIsFetching, (users: UserType[], isFetching: boolean)=>
{if(isFetching) return users.filter(el => true)})