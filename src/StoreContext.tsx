import React from 'react';
//import {StoreType} from './redux/store';
import {AppStoreType} from './redux/redux-store';

const StoreContext = React.createContext({} as AppStoreType);
//const StoreContext = React.createContext({} as any);

export type ProviderType ={
    store: AppStoreType,
    children: any
}

//сейчас используем Provider из библиотеки 'react-redux', этот демонстрирует его работу
export const Provider = (props: ProviderType) => {
    return (
        <StoreContext.Provider value = {props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContext