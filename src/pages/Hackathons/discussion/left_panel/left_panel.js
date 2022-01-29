import React from 'react';
import '../discussion.css';


import {addDoc, collection, doc, Timestamp} from "firebase/firestore";
import Button from "@mui/material/Button";
import {db} from "../../../../firebaseConfig/firebaseConfig";
import FormTextField from "../../../../components/textfield/formTextField";
import Card from "@mui/material/Card";
import { Modal} from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';







export default function LeftPanel(props) {
    const [roomName, setRoomName] = React.useState("");
 ;
    const hackathonCollectionRef = collection(db, "hackathons");
    // getModalStyle is not a pure function, we roll the style only on the first render

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createRoomForChannel = async () => {
        if (roomName !== '') {
            var id2 =  doc(hackathonCollectionRef).id
            await addDoc(collection(db, "channels", props.hackathhonId, "sub_channels_list"), {
                "sub_channel_id": id2,
                "sub_channel_name": roomName,
                "sub_channel_code_name":roomName.split(' ').join("_").toLowerCase(),
                "channel_type": "message"
            })
            await addDoc(collection(db, "channels", props.hackathhonId, roomName.split(' ').join("_").toLowerCase()), {
                "message": "General Discussions",
                "messageType": "message",
                "messageCreatedAt": Timestamp.fromDate(new Date())
            })


        }

    };

    const body = (
        <div style={{
            top: `40%`,
            left: `55%`,
            transform: `translate(-40%, -55%)`,
            position: 'absolute',
            width: 300,
            display:"flex",
            flexDirection:"column",
            backgroundColor: "#FAEEE7",
            border: '2px solid #000',
            boxShadow: "#FAEEE7",
            padding: 10,
        }} >
            <h2 id="simple-modal-title">Create A Room</h2>
            <FormTextField id="filled-basic" label="Filled" onChange={(value)=>{
                setRoomName(value.target.value);
            }} variant="filled" />
            <Button size="small" onClick={createRoomForChannel}>Submit</Button>
        </div>
    );


    return (
        <Card style={{
            display:"flex",
            flexDirection:"column",
            overflow: 'auto',
            height:"82vh",
            backgroundColor:"rgb(10 25 41 / 0%)",
            border:"1px solid #1976d2",
            borderRadius:11,
            margin:10,
            padding:10

        }}>

                <Button  onClick={handleOpen}
                         style={{
                             borderRadius: '11px',width:"100%",marginTop:10,
                             color:"white",
                             backgroundColor:"#1976d2",
                             border:"2px solid #1976d2"
                         }}
                >

                  Create New Room
                </Button>


            {props.sub_channels.map((value)=>{
                return <Button startIcon={<TagIcon/>} style={{
                textAlign:"left",
                    marginTop:20
                }
                } onClick={()=>props.changeRooms(value)}  size="small">{value.sub_channel_name}</Button>
            })}


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </Card>
    );
}
