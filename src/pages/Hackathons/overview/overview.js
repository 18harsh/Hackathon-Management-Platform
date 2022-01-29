import React, {useEffect} from 'react';
import Tabs from "../../../components/tabs/tabs";
import './overview.css';
import FlagIcon from '@mui/icons-material/Flag';
import {useParams} from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { collection,   query, where, onSnapshot, } from "firebase/firestore";
import {db} from "../../../firebaseConfig/firebaseConfig";
import MDEditor from "@uiw/react-md-editor";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from "@mui/material/Typography";


export default function HackathonOverview(props) {

    // getModalStyle is not a pure function, we roll the style only on the first render

    let {hackathonId} = useParams();

    const [hackathon, setHackathon] = React.useState([]);
    const [loading, setLoading] = React.useState(false);



    useEffect(() => {

        const hackathonRef = collection(db, "hackathons");
        const q1 = query(hackathonRef, where("hackathon_id", "==", hackathonId));
        onSnapshot(q1, (querySnapshot) => {
            const hack = [];
            querySnapshot.forEach((doc) => {
                hack.push(doc.data());
            });
            if (hack.length !== 0) {
                setHackathon(hack)
                setLoading(true)
            }



        });




    }, [hackathonId])
    if(loading === true) {
        return (
            <div>

                <Tabs/>

                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    margin:100,
                    flexDirection:"column",
                    borderRadius:5,
                    border:"1px solid #1976d2",
                    padding:40
                }} >
                    <Box sx={{ width: '100%',mb:3 }}>
                        <Stepper  alternativeLabel>

                                <Step active={true} >
                                     <StepLabel StepIconComponent={AppRegistrationIcon} StepIconProps={{
                                         sx:{ color: "#1976d2",fontSize:40,mt:-1 }
                                     }}>Registration Date <br/>{hackathon[0].registrationDate.toDate().toDateString()}</StepLabel>
                                </Step>

                            <Step active={true}>
                                <StepLabel StepIconComponent={FlagIcon} StepIconProps={{
                                    sx:{ color: "#1976d2",fontSize:40,mt:-1 }
                                }}>Start Date <br/>{hackathon[0].hackStart.toDate().toDateString()}</StepLabel>
                            </Step>

                            <Step active={true} >
                                <StepLabel StepIconComponent={EmojiEventsIcon} StepIconProps={{
                                    sx:{ color: "#1976d2",fontSize:40,mt:-1 }
                                }}>End Date <br/>{hackathon[0].hackEnd.toDate().toDateString()}</StepLabel>
                            </Step>

                        </Stepper>
                    </Box>
                    {/*{loadingTeamInfo ? <List*/}
                    {/*    sx={{ width: '100%', maxWidth: 360, bgcolor: "#1976d2",borderRadius:1}}*/}

                    {/*    aria-labelledby="nested-list-subheader"*/}
                    {/*    subheader={*/}
                    {/*        <ListSubheader  sx={{ width: '100%', maxWidth: 360,color:"white", fontSize:20, bgcolor: "#1976d2",}}*/}
                    {/*                        component="div" id="nested-list-subheader">*/}
                    {/*            Participants*/}
                    {/*        </ListSubheader>*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    { teamInfo[0].hackathons.participants.map(value=>{*/}
                    {/*        return <ListItemButton>*/}
                    {/*            <ListItemIcon>*/}

                    {/*            </ListItemIcon>*/}
                    {/*            <ListItemText primary={value}  sx={{ width: '100%', maxWidth: 360, color: "white",}}*/}
                    {/*            />*/}
                    {/*        </ListItemButton>;*/}
                    {/*    })}*/}

                    {/*</List>:<div></div>}*/}
                    <Typography style={{
                        color:"#1976d2",
                        fontSize:30,
                        fontWeight:"bold"
                    }}>
                        About
                    </Typography>
                    <MDEditor.Markdown style={{
                        color:"#1976d2"
                    }} source={hackathon[0].hackDescription
                    !== undefined ? hackathon[0].hackDescription: "<p>Details comming soon</p>>"} />
                </div>
            </div>
        );
    }
    return (
        <div></div>
    );


}
