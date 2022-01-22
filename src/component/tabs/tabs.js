import React, { Component } from 'react';
import ColorButton from '../button/button'
import {NavLink,useParams} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { db } from '../../firebaseConfig/firebaseConfig';
import {addDoc, collection, doc, arrayUnion, query, where, onSnapshot, updateDoc} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {notification} from "antd";
import {useNavigate} from 'react-router-dom';
import {TextField} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({

    paper: {
        position: 'absolute',
        width: 300,
        display:"flex",
        flexDirection:"column",

        backgroundColor: "#FAEEE7",
        border: '2px solid #000',
        boxShadow: "#FAEEE7",
        padding: 10,
    },
});

export default function Tabs(props) {
    const navigate = useNavigate();
    const classes = useStyles();
    let { hackathonId } = useParams();
    const hackathonCollectionRef = collection(db, "hackathons");
    const userCollection = collection(db, "users");
    const [open, setOpen] = React.useState(false);
    const [teamId, setTeamID] = React.useState("");
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(number) {

        const auth = getAuth();
        onAuthStateChanged(auth, async user => {
            var team_id =  doc(hackathonCollectionRef).id
            if(number === 1) {


                const docRef = await addDoc(collection(db,"hackathons",hackathonId,"participants"),{
                    "team_id":team_id,
                    "hackathon_email_id_creator": user.email.toString(),
                    "hackathon_user_id_creator":user.uid,
                    "participant_status":true,
                    "joined_as_team":false,
                });

                await addDoc(collection(db,"users",user.uid,"hackathons_participated"),{
                    "hackathon_id":hackathonId,
                    "Joined_as_team":false,
                    "team_id":team_id,
                    "participant_status":true,

                }).then( data => {
                    notification.success({
                        message: 'Hackathon Has been created',
                        // description:
                        //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                        // onClick: () => {
                        //   console.log('Notification Clicked!');
                        // },
                    })
                    navigate('/home', {replace: true})
                })
                    .catch( error => {
                        notification.error({
                            message: 'Something went wrong',
                            // description:
                            //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                            // onClick: () => {
                            //   console.log('Notification Clicked!');
                            // },
                        })
                    });
            } else if (number === 2) {
                const particpiapntRef = collection(db, "hackathons", hackathonId, "participants");
                const q = query(particpiapntRef, where("team_id", "==", teamId));

                const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                    const hack = [];
                    querySnapshot.forEach((doc) => {
                        hack.push({hackathons: doc.data(), hackathonId: doc.id});
                    });
                    console.log(hack)

                    // const customRef = doc(db,collection(db, "hackathons", hackathonId, "participants"),hack[0].hackathonId)
                    await updateDoc(doc(db,`hackathons/${hackathonId}/participants`,hack[0].hackathonId), {
                        "participant_status": true,
                        "participants": arrayUnion(user.email)
                    });

                    await addDoc(collection(db, "users", user.uid, "hackathons_participated"), {
                        "hackathon_id": hackathonId,
                        "Joined_as_team": true,
                        "team_id": team_id,
                        "participant_status": true,

                    }).then(data => {
                        notification.success({
                            message: 'Hackathon Has been created',
                            // description:
                            //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                            // onClick: () => {
                            //   console.log('Notification Clicked!');
                            // },
                        })
                        navigate('/home', {replace: true})
                    })
                        .catch(error => {
                            notification.error({
                                message: 'Something went wrong',
                                // description:
                                //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                                // onClick: () => {
                                //   console.log('Notification Clicked!');
                                // },
                            })
                        });
                });

            }
        });
    }

    const body = (
        <div style={{
            top: `40%`,
            left: `55%`,
            transform: `translate(-40%, -55%)`,
        }} className={classes.paper}>
            <h2 id="simple-modal-title">Join as A Team</h2>
            <ColorButton className="bg-success w-100 ml-auto" style={{
                borderRadius: '50px',
            }} size="small" onClick={()=>handleSubmit(1)}>Join a Team</ColorButton>
            <h3 id="simple-modal-title">or</h3>
            <h3 id="simple-modal-title">Enter A Team</h3>
            <TextField id="filled-basic" label="Filled" onChange={(value)=>{
                setTeamID(value.target.value);
            }} variant="filled" />
            <ColorButton className="bg-success w-100 ml-auto" style={{
                borderRadius: '50px',
            }} size="small" onClick={()=>handleSubmit(2)}>Enter A Team By Entering Team ID</ColorButton>
        </div>
    );



    return (<div className="d-flex justify-content-around">
        <div>
                <Button color="inherit" component={NavLink} to={`/hackathon/overview/${hackathonId}`}>Overview</Button>
                <Button color="inherit" component={NavLink} to={`/hackathon/discussion/${hackathonId}`}>Discussion</Button>
                <Button color="inherit" component={NavLink} to={`/hackathon/discussion/${hackathonId}`}>Notebook</Button>

        </div>
        <div>
        <ColorButton size="small" onClick={()=>handleOpen()} className="bg-success w-100 ml-auto" style={{
                            borderRadius: '50px',
                        }}
                        >
                        <span className="text-light" style={{
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}>
                        Participate Now
                        </span>
        </ColorButton>
        </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
        );

}
