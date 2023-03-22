//import {createStore} from 'redux';//для старой версии redux
import {combineReducers, legacy_createStore as createStore} from "redux"; //для новой версии redux
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import {StoreType} from './store';

//в функции createStore() происходит создание стейта. createStore() в качестве параметра принимает combineReducers() со всеми  рудьюсерами

let rootReducer = combineReducers({
    messagesPage: dialogsReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer
}); //воспринимаем объект не как связку редьсеров, а как стейт
//
// в combineReducers передали объект вида: {profileReducer: profileReducer,dialogsReducer: dialogsReducer,sidebarReducer: sidebarReducer} (когда в объекте название свойства и его значение идентичны, можно писать более коротко, просто название свойства (будет подразумеваться, что значение будет такое же)

export type AppStateType = ReturnType<typeof rootReducer>
export type DispatchType = typeof store.dispatch //(action: ActionsType) => void
export type AppStoreType = typeof store
let store  = createStore(rootReducer);

export default store;