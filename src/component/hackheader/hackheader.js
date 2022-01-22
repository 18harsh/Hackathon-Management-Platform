import React from 'react';
import { BiTime } from 'react-icons/bi';

export default function Hackheader(props) {

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
    <a href={props.hackathon.website} target="_blank" rel="noopener noreferrer" style={{
      textDecoration: 'none'
    }}
    >
    <h3 className="text-light mt-1"
     
    >{props.hackathon.hackName}</h3>
    </a>
    </div>

    

  </div>
  );
}
