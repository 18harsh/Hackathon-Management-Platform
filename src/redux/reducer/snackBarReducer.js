import * as actionTypes from '../actionTypes';
import {updateObject} from "../utitlity";

const initialState = {
    status: false,
    message: null,
    typeOfMessage: false

}

const snackBarShow = (state, action) => {
    return updateObject(state, {
        status: action.status,
        message: action.message,
        typeOfMessage: action.typeOfMessage
    });
}

const snackBarHide = (state, action) => {
    return updateObject(state, {
        status: action.status,
        message: action.message,
        typeOfMessage: action.typeOfMessage
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SNACKBAR_TRUE:
            return snackBarShow(state, action);
        case actionTypes.SNACKBAR_FALSE:
            return snackBarHide(state, action);

        default:
            return state;
    }
}

export default reducer;
