import React, { useEffect, useState } from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import {TextField} from "@material-ui/core";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {Divider} from 'antd';



import {db} from "../../firebaseConfig/firebaseConfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {arrayUnion, collection, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {useParams} from "react-router-dom";


const ColorButton = withStyles((theme) => ({
    root: {
        color: '#325288 !important',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "15px",
        margin:5,
        width:"100%",
        textTransform:"none",
        border:"1px solid #325288"
    },
}))(Button);




const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        height:"82vh",
        backgroundColor:"white",
        margin:10
    },
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

export default function OrganizerPage(props) {
    const classes = useStyles();


    let {hackathonId} = useParams();
    const [participants, setParticipants] = useState();
  
    useEffect(() => {
  
      const auth = getAuth();
      onAuthStateChanged(auth, async user => {
          const particpiapntRef = collection(db, "hackathons", hackathonId, "participants");
          const q = query(particpiapntRef);
  
          const unsubscribe = onSnapshot(q, async (querySnapshot) => {
              const hack = [];
              querySnapshot.forEach((doc) => {
                  hack.push({hackathons: doc.data(), hackathonId: doc.id});
              });
              setParticipants(hack)
             });
      });
  
  
  }, []);

    console.log(participants)

    return (
        <div className={classes.root}>
            <div className="mx-2">
                <h4>
                Total participants: {participants?.length}
                </h4>
            </div>

            {
                participants?.map((participant)=> (
                    <div key={participant.hackathonId} className="mx-2" style={{
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        transition: '0.3s',
                        "&:hover": {
                            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
                          },
                        padding: '20px',
                        marginBottom: '20px'
                        
                    }}>

                        <div className="d-flex justify-content-between">
                            <>
                        {
                            participant?.hackathons?.repoName ? 
                            <h3>
                            <a href={participant?.hackathons?.repoWebsite} target="_blank" rel="noopener noreferrer" style={{
                                textDecoration: 'none'
                            }}>
                            <span className="text-dark">
                            {participant?.hackathons?.repoName}
                            </span>
                            </a> - <span className="text-success">Submitted</span>
                            </h3> :
                            <h3>
                                <span className="text-danger">Project Not Submitted Yet</span>
                            </h3>
                        }</>
                        <>
                        Team Id: {participant?.hackathons?.team_id}
                        </>
                        
                        </div>
                        
                       <div>
                            {
                            participant?.hackathons?.participants.map((name)=>(
                                <h6>
                                    {name}  {name === participant?.hackathons?.hackathon_email_id_creator && "(Team Leader)"}
                                </h6>
                            ))
                            }
                        </div>
                        
                        <Divider/>
                        <div>
                            <h5>
                                Project Features
                            </h5>

                            <div
                                dangerouslySetInnerHTML={{__html: participant?.hackathons?.projectFeature
                                    !== "" ? participant?.hackathons?.projectFeature : "<p>Features not added</p>>"}}/>
                        </div>



                    </div>
                ))
            }

        </div>
    );
}
