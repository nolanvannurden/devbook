import { applyMiddleware, createStore } from "redux";
import userReducer from "./userReducer";
import promiseMiddleware from "redux-promise-middleware";

export default createStore(userReducer, applyMiddleware(promiseMiddleware));
// export default createStore(reducer, applyMiddleware(promiseMiddleware))
