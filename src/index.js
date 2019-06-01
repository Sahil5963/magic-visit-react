import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import updateRecordReducer from "./store/reducers/updateRecord";
import demoReducer from "./store/reducers/demo";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : null;

const rootReducer = combineReducers({
  demo: demoReducer,
  auth: authReducer,
  updateRecord: updateRecordReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
