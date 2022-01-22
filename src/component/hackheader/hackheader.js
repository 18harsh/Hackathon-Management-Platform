import React from 'react';
import { BiTime } from 'react-icons/bi';

export default function Hackheader() {

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
      <BiTime size={30}/> Ends on 31th Jan'22 09:00 PM (India Standard Time)
    </div>
    <h3 className="text-light mt-1"
     
    >Data Sprint 62 - Weather Recognition</h3>
    </div>

    

  </div>
  );
}
