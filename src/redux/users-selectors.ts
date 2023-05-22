import {AppStateType} from './redux-store';

//функции-геттеры, которые достают из стейта нужные нам части
export const getUsers = (state: AppStateType) => state.userPage.users
export const getPageSize = (state: AppStateType) => state.userPage.pageSize
export const getTotalUsersCount = (state: AppStateType) => state.userPage.totalUsersCount
export const getCurrentPage = (state: AppStateType) => state.userPage.currentPage
export const getIsFetching = (state: AppStateType) => state.userPage.isFetching
export const getIsFollowingInProgress = (state: AppStateType) => state.userPage.isFollowingInProgress
