import { createStore, applyMiddleware,compose } from "redux";
import thunk from "redux-thunk"
import reducers from "./reducer/index"
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers,
    {},
    composeEnhances(
    applyMiddleware(thunk))
)