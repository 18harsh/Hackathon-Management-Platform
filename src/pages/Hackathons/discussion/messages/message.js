import React from 'react';
import Avatar from "@mui/material/Avatar";







export default function Message({message, image,name,time}) {


    // getModalStyle is not a pure function, we roll the style only on the first render
        return (


            <div style={{
                alignSelf: "flex-start",width: 300, backgroundColor: "#1b508b", borderRadius: 5, margin: 15}}>
                
                <div>
                <Avatar src={image=== null? `https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`:image}/>
                <h6 >
                    {name}
                </h6>
                </div>
                <div style={{
                    display:"flex",
                    justifyContent:"space-between"
                }}>
                    <div className="text-light">
                        {message}
                    </div>
                    <div className="text-light">
                        {time.toDate().toLocaleTimeString()}
                    </div>
                </div>

            </div>

        );
   

}
