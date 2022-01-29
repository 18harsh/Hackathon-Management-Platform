import {combineReducers} from "redux";
import userAuthReducer from "./userAuthReducer"
import snackBar from "./snackBarReducer"

const reducers = combineReducers({
    user: userAuthReducer, snackBar: snackBar
})

export default reducers