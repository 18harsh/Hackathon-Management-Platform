import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import {TextField} from "@material-ui/core";
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {addDoc, collection, doc, Timestamp} from "firebase/firestore";
import {db} from "../../../firebaseConfig/firebaseConfig";

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

export default function LeftPanel(props) {
    const [roomName, setRoomName] = React.useState("");
    const classes = useStyles();
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
        if (roomName != '') {
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
        }} className={classes.paper}>
            <h2 id="simple-modal-title">Create A Room</h2>
            <TextField id="filled-basic" label="Filled" onChange={(value)=>{
                setRoomName(value.target.value);
            }} variant="filled" />
            <ColorButton size="small" onClick={createRoomForChannel}>Submit</ColorButton>
        </div>
    );


    return (
        <Card className={classes.root}>
            <CardActions className="align-items-center" style={{
                padding: '4px !important'
            }}>
                <ColorButton size="small" onClick={handleOpen} 
                    style={{
                        outline: 'none',
                    }}
                >
                    <AiOutlinePlusCircle size={27}/>
                    <h5 className="m-1">Create New Room</h5>
                </ColorButton>

            </CardActions>

            {props.sub_channels.map((value)=>{
                return <ColorButton onClick={()=>props.changeRooms(value)} style={{
                    border: '0px',

                }} size="small">{value.sub_channel_name}</ColorButton>
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
