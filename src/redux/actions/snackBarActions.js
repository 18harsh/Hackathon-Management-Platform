import * as actionTypes from '../actionTypes';

export const snackBarShow = (status, typeOfMessage, message) => {
    return {
        type: actionTypes.SNACKBAR_TRUE,
        status: status,
        typeOfMessage: typeOfMessage,
        message: message,

    };
}

export const snackBarHide = () => {
    return {
        type: actionTypes.SNACKBAR_FALSE,
        status: false,
        typeOfMessage: null,
        message: null,

    };
}


