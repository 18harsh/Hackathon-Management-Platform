import React, { useEffect, useState } from 'react';
import { BiTime } from 'react-icons/bi';


import {db} from "../../firebaseConfig/firebaseConfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {arrayUnion, collection, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {useParams} from "react-router-dom";



export default function Hackheader(props) {
  let {hackathonId} = useParams();
    const [participants, setParticipants] = useState("");
  
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
  return (
  <div>
      <img src={require('./card_default.jpg')} style={{
                width: '100%',
                height: '40vh',
        }}/>
    
    <div 
       style={{
        position: 'absolute',
        left: '30px',
        top: '180px',
      }}
    >
    <div className="bg-success align-items-center text-light p-1">
      <BiTime size={30}/> Ends on {props.hackathon.hackEnd.toDate().toDateString()+" "+props.hackathon.hackEnd.toDate().toLocaleTimeString()+" Indian Standard Time"}
    </div>

            <div className="d-flex justify-content-between">
            <a href={props.hackathon.website} target="_blank" rel="noopener noreferrer" style={{
              textDecoration: 'none'
            }}
            >
            <h3 className="text-light mt-1"
            
            >{props.hackathon.hackName}</h3>
            </a>
           
            </div>

            
    </div>

    <h4 className="text-light p-1" style={{
              right: '100px',
              top: '190px',
              position: 'absolute'
    }}>Registered Teams: {participants.length}</h4>
    

  </div>
  );
}
