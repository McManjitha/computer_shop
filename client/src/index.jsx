import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/main.css";

import Router from "./router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import ReduxStore from "./redux/store";

const { persistor, store } = ReduxStore;
ReactDOM.render(
    <Provider store={store} className="w-screen">
        <PersistGate loading={null} persistor={persistor} className='w-full'>
            <Router className='w-full'/>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
