import React, { useEffect} from 'react';
import {NavLink,useParams} from 'react-router-dom';
import {addDoc, collection, doc, arrayUnion, query, where, onSnapshot, updateDoc} from "firebase/firestore";

import {useNavigate} from 'react-router-dom';
import {db} from "../../firebaseConfig/firebaseConfig";
import Button from "@mui/material/Button";
import FormTextField from "../textfield/formTextField";
import {Modal} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {snackBarShow} from "../../redux/actions/snackBarActions";
function copyText(entryText){
    navigator.clipboard.writeText(entryText);
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: "#0a1929",
    border: '2px solid #1976d2',
    borderRadius:3,
    boxShadow: 24,
    p: 4,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center"
};

export default function Tabs(props) {
    const navigate = useNavigate();
    let { hackathonId } = useParams();
    const userState = useSelector((state) => state.user);

    const hackathonCollectionRef = collection(db, "hackathons");

    const [open, setOpen] = React.useState(false);
    const [teamId, setTeamID] = React.useState("");
    const [userParticipation, setUserParticipation] = React.useState(false);
    const [teamInfo, setTeamInfo] = React.useState();



    function getUserParticipation(){

            console.log(userState.emailId)
            const particpiapntRef = collection(db, "hackathons", hackathonId, "participants");
            const q = query(particpiapntRef, where("participants_emailId", "array-contains",userState.emailId ));
            onSnapshot(q, (querySnapshot) => {
                const hack = [];
                querySnapshot.forEach((doc) => {
                    hack.push({hackathons: doc.data(),hackathonId:doc.id});
                });
                if (hack.length !== 0) {
                    setUserParticipation(true)
                    setTeamInfo(hack)
                }
                // console.log(hack,">>>>>>>>>>>>" )

            });


    }

    useEffect(()=>{

        const particpiapntRef = collection(db, "hackathons", hackathonId, "participants");
        const q = query(particpiapntRef, where("participants_emailId", "array-contains",userState.emailId ));
        onSnapshot(q, (querySnapshot) => {
            const hack = [];
            querySnapshot.forEach((doc) => {
                hack.push({hackathons: doc.data(),hackathonId:doc.id});
            });
            if (hack.length !== 0) {
                setUserParticipation(true)
                setTeamInfo(hack)
            }
            // console.log(hack,">>>>>>>>>>>>" )

        });

    },[hackathonId,userState]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleSubmit(number) {

        var team_id = doc(hackathonCollectionRef).id
        if(userState.displayName !== null) {
            if (number === 1) {


                console.log(userState.userId, userState.displayName)
                await addDoc(collection(db, "hackathons", hackathonId, "participants"), {
                    "team_id": team_id,
                    "hackathon_email_id_creator": userState.emailId.toString(),
                    "hackathon_user_id_creator": userState.userId,
                    "participant_status": true,
                    "joined_as_team": false,
                    "participants_name": arrayUnion(userState.displayName),
                    "participants_emailId": arrayUnion(userState.emailId),
                    "participant_id": arrayUnion(userState.userId)
                });

                await addDoc(collection(db, "users", userState.userId, "hackathons_participated"), {
                    "hackathon_id": hackathonId,
                    "Joined_as_team": false,
                    "team_id": team_id,
                    "participant_status": true,

                }).then(data => {

                    navigate('/home', {replace: true})
                })
                    .catch(error => {

                    });
                getUserParticipation();
            } else if (number === 2) {
                const particpiapntRef = collection(db, "hackathons", hackathonId, "participants");
                const q = query(particpiapntRef, where("team_id", "==", teamId));

                onSnapshot(q, async (querySnapshot) => {
                    const hack = [];
                    querySnapshot.forEach((doc) => {
                        hack.push({hackathons: doc.data(), hackathonId: doc.id});
                    });
                    // console.log(hack,team_id)

                    // const customRef = doc(db,collection(db, "hackathons", hackathonId, "organizer_page"),hack[0].hackathonId)
                    await updateDoc(doc(db, `hackathons/${hackathonId}/participants`, hack[0].hackathonId), {
                        "participant_status": true,
                        "participants_name": arrayUnion(userState.displayName),
                        "participants_emailId": arrayUnion(userState.emailId),
                        "participant_id": arrayUnion(userState.userId)
                    });

                    await addDoc(collection(db, "users", userState.userId, "hackathons_participated"), {
                        "hackathon_id": hackathonId,
                        "Joined_as_team": true,
                        "team_id": team_id,
                        "participant_status": true,

                    }).then(data => {


                        getUserParticipation();
                    })
                        .catch(error => {

                        });
                });

            }
        } else {
            snackBarShow(true,'info','Please Update your Display Name from Profile Section')
        }

    }



    return (<><Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            flexDirection:"row",
            width:"80%"
        }}>
            <div style={{
                display:"flex",
                flexDirection:"row",

            }}>
                <Button color="inherit" style={{
                    borderRadius: '11px',width:"100%",marginTop:10,
                    color:"white",marginRight:10,
                    backgroundColor:"#1976d2",
                    border:"2px solid #1976d2"
                }} component={NavLink} to={`/hackathon/overview/${hackathonId}`}>Overview</Button>
                {userParticipation &&  <Button color="inherit" style={{
                    borderRadius: '11px',width:"100%",marginTop:10,
                    color:"white",marginRight:10,
                    backgroundColor:"#1976d2",
                    border:"2px solid #1976d2"
                }} component={NavLink} to={`/hackathon/discussion/${hackathonId}`}>Discussion</Button> }
                {userParticipation &&  <Button color="inherit" style={{
                    borderRadius: '11px',width:"100%",marginTop:10,
                    color:"white",marginRight:10,
                    backgroundColor:"#1976d2",
                    border:"2px solid #1976d2"
                }} component={NavLink} to={`/hackathon/participant/${hackathonId}`}>Participants</Button> }

                {userParticipation &&    <Button color="inherit" style={{
                    borderRadius: '11px',width:"100%",marginTop:10,
                    color:"white",marginRight:10,
                    backgroundColor:"#1976d2",
                    border:"2px solid #1976d2"
                }} component={NavLink} to={`/hackathon/submission/${hackathonId}`}>Submission</Button> }

            </div>
            <div>
                {userParticipation ? <Button size="small"  style={{
                    borderRadius: '11px',width:"100%",marginTop:10,
                    color:"white",
                    backgroundColor:"#1976d2",
                    border:"2px solid #1976d2"
                }}
                >
<span onClick={() => copyText(teamInfo?.length >0 && teamInfo[0]?.hackathons?.team_id)}>
Share Team id: {teamInfo?.length >0 && teamInfo[0]?.hackathons?.team_id}
</span>


                </Button>: <Button size="small" style={{
                    borderRadius: '11px',width:"100%",marginTop:10,
                    color:"white",
                    backgroundColor:"#1976d2",
                    border:"2px solid #1976d2"
                }} onClick={()=>handleOpen()}
                >

                        Participate Now

                </Button>}
            </div>
        </div>

        </Grid>
            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                        <Button  style={{
                            borderRadius: '11px',width:"100%",marginTop:10,
                            color:"white",
                            backgroundColor:"#1976d2",
                            border:"2px solid #1976d2"
                        }}  size="small" onClick={()=>handleSubmit(1)}>Join Solo</Button>
                        <h3 style={{
                            color:"white"
                        }}>or</h3>
                        <h3 style={{
                            color:"white"
                        }}>Join A Team</h3>
                        <FormTextField label="Enter Team Id" fullWidth sx={{input: {color: '#1976d2'}, mt: 2}} id="filled-basic" onChange={(value)=>{
                            setTeamID(value.target.value);
                        }} variant="outlined" />
                        <Button style={{
                            borderRadius: '11px',width:"100%",marginTop:10,
                            color:"white",
                            backgroundColor:"#1976d2",
                            border:"2px solid #1976d2"
                        }} size="small" onClick={()=>handleSubmit(2)}>Enter A Team By Entering Team ID</Button>
                    </Box>
                </Modal>
            </div>
    </>
    );

}
