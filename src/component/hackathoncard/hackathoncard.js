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
        width: "300px",
        minHeight:"400px",
        backgroundColor:"#FAEEE7",
        margin:10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
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

export default function Hackathoncard() {
    const [roomName, setRoomName] = React.useState("");
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render




    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5"  component="h2" >
                    Hackathon Name
                </Typography>
                <Typography variant="h5" component="h2">
                    Start Date
                </Typography>
                <Typography variant="h5" component="h2" color="textSecondary">
                    21th October 2022
                </Typography>
                <Typography variant="h5" component="h2">
                    Last Date
                </Typography>
                <Typography variant="h5" component="h2" color="textSecondary">
                    21th October 2022
                </Typography>
            </CardContent>

            <CardActions>
                <ColorButton size="small">Participate</ColorButton>
            </CardActions>


        </Card>
    );
}
