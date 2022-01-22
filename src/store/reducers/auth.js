import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utitlity";

const initialState = {
    refreshToken: null,
    error: null,
    loading: false,
    userType: null,
    userId:null,
    emailId:null,



}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        emailId:action.emailId,
        refreshToken: action.refreshToken,
        displayName: action.displayName,
        userId: action.userId,
        error: null,
        loading: false,
    });
}


const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        refreshToken: null,
        admin_priority: false,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;
