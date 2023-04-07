//import {createStore} from 'redux';//для старой версии redux
import {combineReducers, legacy_createStore as createStore} from "redux"; //для новой версии redux
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';

//в функции createStore() происходит создание стейта. createStore() в качестве параметра принимает combineReducers() со всеми  рудьюсерами

let rootReducer = combineReducers({
    messagesPage: dialogsReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    userPage: usersReducer
}); //воспринимаем объект не как связку редьсеров, а как стейт со свойствами messagesPage, profilePage и т.д., в которых находятся объекты, возвращаемые соответствующими редьюсерами
//
// в combineReducers передали объект вида: {profileReducer: profileReducer,dialogsReducer: dialogsReducer,sidebarReducer: sidebarReducer,  userPage: usersReducer} (когда в объекте название свойства и его значение идентичны, можно писать более коротко, просто название свойства (будет подразумеваться, что значение будет такое же)

export type AppStateType = ReturnType<typeof rootReducer>
export type DispatchType = typeof store.dispatch //(action: ActionsType) => void
export type AppStoreType = typeof store

let store  = createStore(rootReducer);

export default store;

// @ts-ignore
window.store = store;