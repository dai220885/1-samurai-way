import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/redux-store';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import {Provider} from 'react-redux';
//в Provider передаем стор, после чего он будет доступен в контейнерной компоненте через StoreContext.Consumer
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            {/*<App store={store} state={state} dispatch={store.dispatch.bind(store)}/>*/}
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);



