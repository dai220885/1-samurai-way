import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, {AppStateType} from './redux/redux-store';
import {BrowserRouter} from 'react-router-dom';

import './index.css';

//import StoreContext, {Provider} from './StoreContext';
// сначала пользовались провайдером из StoreContext.ts, теперь перешли на Provider из библиотеке 'react-redux'
import {Provider} from 'react-redux';

//сначала в rerenderEntireTree передавали стейт (вызывали "store.getState()"), чтобы передать его дальше в качестве пропсов, теперь же стейт дальше не передается, поэтому его не нужно передавать в rerenderEntireTree


//let rerenderEntireTree = () => {
//убрали отрисовку из функции, а просто единожды выполнили ее
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            {/*<App store={store} state={state} dispatch={store.dispatch.bind(store)}/>*/}
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
//}
//первый вызов функции rerenderEntireTree с передачей в нее актуального стейта для отображения на странице
//rerenderEntireTree(store.getState());


//rerenderEntireTree();
//store.subscribe(() => rerenderEntireTree(store.getState()))

//больше не нужно субскрайбиться, т.к. "connect", используемый в контейнерных компонентах сделает это за нас
//store.subscribe(() => rerenderEntireTree())

//далее функцию rerenderEntireTree передаем в качестве параметра в метод store.subscribe() (store.subscribe(rerenderEntireTree)) который  изменит поведение метода 'store._rerenderEntireTree' на поведение функции 'rerenderEntireTree', которая придет в качестве параметра

//store.subscribe(rerenderEntireTree)
//
// было так, когда наш store сам передавал актуальный(измененный стейт) в функцию rerenderEntireTree (в методе dispatch), store из реакта так не делает, он просто уведомляет подписчика об изменении стейта, поэтому актуальный стейт нужно передать самостоятельно, для этого в subscribe передаем анонимную функцию, которая запустит наш rerenderEntireTree и передаст в нее актуальный стейт (store.getState())


