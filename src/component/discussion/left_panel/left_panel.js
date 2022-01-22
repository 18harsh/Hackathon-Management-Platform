import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import {TextField} from "@material-ui/core";

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
        width: "25%",
        minHeight:"800px",
        backgroundColor:"#FAEEE7",
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

export default function LeftPanel() {
    const [roomName, setRoomName] = React.useState("");
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createRoomForChannel = () => {
        if(roomName!='') {
            console.log(roomName);
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
            <CardActions>
                <ColorButton size="small" onClick={handleOpen}>+</ColorButton>
            </CardActions>
            <CardActions>
                <ColorButton size="small">#announcments</ColorButton>
            </CardActions>
            <CardActions>
                <ColorButton size="small">#announcments</ColorButton>
            </CardActions>

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
