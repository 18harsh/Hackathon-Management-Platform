import React, {useEffect} from 'react';
import Tabs from "../../../components/tabs/tabs";
import {useParams} from 'react-router-dom';
import { collection, query, where, onSnapshot} from "firebase/firestore";
import {db} from "../../../firebaseConfig/firebaseConfig";
import {List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {useSelector} from "react-redux";


export default function Participants(props) {
    // const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render

    let {hackathonId} = useParams();

    const [loading, setLoading] = React.useState(false);
    const [loadingTeamInfo, setLoadingTeamInfo] = React.useState(false);
    const [teamInfo, setTeamInfo] = React.useState([]);
    const userState = useSelector((state) => state.user);


    useEffect(() => {

        const particpiapntRef = collection(db, "hackathons", hackathonId, "participants");
        const q2 = query(particpiapntRef, where("participants_emailId", "array-contains",userState.emailId ));
        onSnapshot(q2, (querySnapshot) => {
            const hack2 = [];
            querySnapshot.forEach((doc) => {
                hack2.push({hackathons: doc.data(),hackathonId:doc.id});
            });
            if (hack2.length !== 0) {

                setTeamInfo(hack2)
                setLoadingTeamInfo(true)
                setLoading(true);
            }
            // console.log(hack2,">>>>>>>>>>>>" )

        });



    }, [hackathonId,userState])
    if(loading === true) {
        return (
            <div>

                <Tabs/>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 100,
                    flexDirection: "column",
                    borderRadius: 5,
                    border: "1px solid #1976d2",
                    padding: 40
                }}>

                    {loadingTeamInfo ? <List
                        sx={{width: '100%', maxWidth: 360, bgcolor: "#1976d2", borderRadius: 1}}

                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader
                                sx={{width: '100%', maxWidth: 360, color: "white", fontSize: 20, bgcolor: "#1976d2",}}
                                component="div" id="nested-list-subheader">
                                Participants
                            </ListSubheader>
                        }
                    >
                        {teamInfo[0].hackathons.participants_name.map((value,index) => {
                            return <ListItemButton>
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText primary={index+1+". "+value} sx={{width: '100%', maxWidth: 360, color: "white",}}
                                />
                            </ListItemButton>;
                        })}
                    </List> : <div></div>}

                </div>
            </div>);
    }
    return <div></div>
}






