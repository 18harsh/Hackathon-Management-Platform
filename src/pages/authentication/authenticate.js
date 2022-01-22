import React, {Component,} from 'react';
import css from './auth.module.css';
// import app from "firebase/app";
import * as actions from "../../store/actions/userAuthActions";
import {connect} from "react-redux";
import {getAuth, GithubAuthProvider,setPersistence,browserSessionPersistence , onAuthStateChanged, signInWithPopup} from "firebase/auth";
import { db } from "../../firebaseConfig/firebaseConfig";
import { doc, setDoc,getFirestore } from "firebase/firestore";
import GithubButton from 'react-github-login-button'
import Card from '@material-ui/core/Card';


class Authenticate extends Component {
    state = {
        isAuth: false,
        photoURL: null,
        displayName: null,
        emailId: null,
        phoneNumber: null,
        redirect:false
    }




    componentDidMount = () => {
        const auth = getAuth();
        onAuthStateChanged(auth,user => {

            this.setState({
                isAuth: !!user,
            })
            console.log("user", user)
        })
    }

    setUserData = async (email, displayName, githubId, uid) => {

        console.log(db)
        await setDoc(doc(db, "users", uid), {
            "displayName": displayName,
            "userUid": uid,
            "githubId": githubId,
            "emailId": email
        });

    }

    signInWithGithub = ()=> {
        const auth = getAuth();
        const provider = new GithubAuthProvider();

        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return signInWithPopup(auth, provider)
                    .then( (result) => {
                        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                        const credential = GithubAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;

                        // The signed-in user info.
                        const user = result.user;
                        console.log(user)
                        this.setUserData(user.email, user.displayName,user.reloadUserInfo.screenName,user.uid)
                        this.props.onAuthLogin(user.email, user.displayName, token, user.uid)


                        // ...
                    }).catch((error) => {
                        // Handle Errors here.
                        // const errorCode = error.code;
                        // const errorMessage = error.message;
                        // // The email of the user's account used.
                        // const email = error.email;
                        // // The AuthCredential type that was used.
                        // const credential = GithubAuthProvider.credentialFromError(error);
                        // ...
                    });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }



    render() {
        if (this.state.redirect){
            return <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 80,
                flexDirection: "column",

            }}>

            </div>;
        }
        return (
            <div className="d-flex justify-content-center align-items-center mx-auto" style={{marginTop:'15vh', width:'450px',height:'500px',boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>

            
            <Card >
                <img src={require('./Hackathon_logo.jpeg')} style={{
                    width:'230px',
                    height:'250px',
                    marginBottom: '10px'
                }}/>
                
                {
                    this.props.isAuth ?
                        <>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 85,
                                flexDirection: "column",

                            }}>

                            </div>
                        </>
                        :
                        <GithubButton
                            onClick={() => {  this.signInWithGithub(); }}
                        />


                }
            </Card>
            </div>
        );
    }


}

const mapStateToProps = state => {

    return {
        isAuth: state.user.refreshToken !== null,
        userType: state.user.userType,
        userId:state.user.userId,
        emailId:state.user.emailId

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin: (emailId,displayName,refreshToken,userUid) => dispatch(actions.userAuthentication(emailId,displayName,refreshToken,userUid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);

// export default Authenticate;
