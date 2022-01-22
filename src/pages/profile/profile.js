import React, {Component} from "react";
import CssTextField from "../../component/TextField/TextField";
import Css from './profile.module.css';
import {getAuth, onAuthStateChanged} from "firebase/auth";

class Profile extends Component{
    state={
        redirect:false,
        photoURL:null,
        displayName:null,
        emailId:null,
        phoneNumber:null
    }
    componentDidMount() {
        const auth = getAuth();
        onAuthStateChanged(auth,user => {
            console.log(user)
            if (user === null) {
                this.setState({
                    redirect:true
                })
            } else {
                this.setState({
                    photoURL:user.photoURL,
                    displayName:user.displayName,
                    emailId:user.email,
                    phoneNumber:user.reloadUserInfo.screenName,
                })
                console.log("user", user)
            }

        })
    }

    render(){
        if (this.state.redirect){
            return <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                marginTop:80,
                flexDirection:"column",

            }}></div>;
        }
        return (
            <>
                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    marginTop:80,
                    flexDirection:"column",

                }}>
                    <br/>
                    <img className={Css.imageProfile} src={this.state.photoURL === null ? "Not Found" : this.state.photoURL} alt=""/>
                    <br/>
                    <CssTextField className={`${Css.textFiled} text-dark`} value={this.state.displayName === null ? "Not Found" : this.state.displayName} label={"Name"} />
                    <br/>
                    <CssTextField className={Css.textFiled} value={this.state.emailId === null ? "Not Found" : this.state.emailId} label={"Email ID"} />
                    <br/>
                    <CssTextField className={Css.textFiled} value={this.state.phoneNumber === null ? "Not Found" : this.state.phoneNumber} label={"Github User Name"} />


                </div>

            </>
        );
    }


}


export default Profile;
