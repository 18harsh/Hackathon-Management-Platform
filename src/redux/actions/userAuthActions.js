import * as actionTypes from '../actionTypes';
// import firebase from "../../firebaseConfig/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (refreshToken, displayName, userId, emailId,photoURL) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        refreshToken: refreshToken,
        displayName: displayName,
        userId: userId,
        emailId: emailId,
        photoURL:photoURL
    };
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error

    };
}

export const logout = () => {
    // console.log("ENTERED ACTIONS?AUTH JS LOGOUT")
    const auth = getAuth();

    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('displayName');
    localStorage.removeItem('emailId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('photoURL');

    auth.signOut();

    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            // dispatch(logout())

        }, expirationTime * 1000)
    }
}

export const userAuthentication = (emailId,displayName,refreshToken,userUid,photoURL) => {
    return dispatch => {
        dispatch(authStart());
        console.log("AUTH STARTED");
        const userId = userUid;



        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userUid);
        localStorage.setItem('displayName', displayName);
        localStorage.setItem('emailId', emailId);
        localStorage.setItem('photoURL', photoURL);
        // localStorage.setItem('phoneNumber',auth.currentUser.phoneNumber);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(refreshToken, displayName, userId, emailId,photoURL))
        dispatch(checkAuthTimeout(expirationDate));


    };
}

export const authCheckState = () => {
    return dispatch => {
        const auth = getAuth();
        onAuthStateChanged(auth,user => {

            if (user === null || user === 'undefined') {
                dispatch(logout())
            } else {

                const refreshToken = user.refreshToken;
                const userId = user.uid;
                const emailId = user.email;
                const displayName = user.displayName;
                const photoUrl = user.photoURL;



                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                if (expirationDate <= Date()) {

                    dispatch(logout())
                } else {
                    dispatch(authSuccess(refreshToken, displayName, userId, emailId,photoUrl))
                    // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
                }
            }
            // console.log("user", user)


        })

    }
}



