import React, {useEffect, useState} from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import CssTextField from "../../components/textfield/textfield";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {bindActionCreators} from "redux";
import { snackBarActions} from "../../redux";

const Profile = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    const [displayName,setDisplayName] = useState(true);
    const {snackBarShow} = bindActionCreators(snackBarActions, dispatch);
    // const [loading,setLoading] = useState(true);

    // state={
    //     redirect:false,
    //     photoURL:null,
    //     displayName:null,
    //     emailId:null,
    //     phoneNumber:null
    // }
   useEffect(()=>{
       // const auth = getAuth();
       // onAuthStateChanged(auth,user => {
       //     console.log(user)
       //     if (user === null) {
       //         this.setState({
       //             redirect:true
       //         })
       //     } else {
       //         this.setState({
       //             photoURL:user.photoURL,
       //             displayName:user.displayName,
       //             emailId:user.email,
       //             phoneNumber:user.reloadUserInfo.screenName,
       //         })
       //         console.log("user", user)
       //     }
       //
       // })
   });

        const submit = () => {
            console.log(displayName);
            if(displayName !== null && displayName !== '') {
                const auth = getAuth();
                updateProfile(auth.currentUser, {
                    displayName: displayName
                }).then(() => {
                    snackBarShow(true,'success',"User Details Updated Successfully")
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
            }

        }


        // if (){
        //     return <div style={{
        //         display:"flex",
        //         justifyContent:"center",
        //         alignItems:"center",
        //         marginTop:80,
        //         flexDirection:"column",
        //
        //     }}></div>;
        // }
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
                    <Avatar alt="Remy Sharp" src={userState.photoURL === null ? "Not Found" : userState.photoURL} style={{
                        width:250,
                        height:250
                    }} />

                    <br/>
                    <Typography variant="h6" gutterBottom component="div" style={{
                        color:"white",marginRight:284
                    }}>
                        Name
                    </Typography>
                    <CssTextField value={"Name" +userState.displayName === null ? "Not Found" : userState.displayName} onChange={value=>setDisplayName(value.target.value)} label={"Name"} />
                    <br/>

                        <Typography variant="h6" gutterBottom component="div" style={{
                            color:"white",marginRight:284
                        }}>
                            Email
                        </Typography>


                    <CssTextField  value={userState.emailId === null ? "Not Found" : userState.emailId} label={"Email ID"} />
                    <br/>
                    <Typography variant="h6" gutterBottom component="div" style={{
                        color:"white",marginRight:247
                    }}>
                        Phone No
                    </Typography>
                    <CssTextField  value={userState.phoneNumber === null ? "Not Found" : userState.phoneNumber} label={"Github User Name"} />

                    <Button onClick={submit}>
                        Update Details
                    </Button>

                </div>

            </>
        );



}


export default Profile;
