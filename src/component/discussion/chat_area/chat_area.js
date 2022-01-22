import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssTextField from "../../TextField/TextField";
import Message from "../messages/message";

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#325288 !important',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "15px",
        marginTop:"10px",
        marginRight:"10px",
        width:"100%",
       textTransform:"none",

    },
}))(Button);


const useStyles = makeStyles({
    root: {
        display:"flex",

        justifyContent:"space-between",
        flexDirection:"column",
        width: "100%",
        minHeight:"800px",
        backgroundColor:"#FAEEE7",
        margin:10
    },
    root2: {
        width: "98%",
        minHeight:"50px",
        backgroundColor:"#",
        margin:10,
        border:"1px solid #325288",
        alignSelf:"flex-start",
        alignItems:"flex-start"
    },
    root3: {
        width: "98%",
        minHeight:"50px",
        backgroundColor:"#",
        margin:10,
        border:"1px solid #325288",

    },
    root4: {
        display:"flex",
        flexDirection:"column",
        width: "98%",
        minHeight:"700px",
        backgroundColor:"#",
        margin:10,
        border:"1px solid #325288",

    },

});

export default function RightPanel() {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <Card className={classes.root2}>
                <CardActions>
                    <ColorButton size="small">#announcments</ColorButton>
                </CardActions>
            </Card>
            <Card className={classes.root4}>
                <Message message={"Hello"} type={"1"}/>
                <Message message={"Hello"} type={"2"}/>
            </Card>
            <Card className={classes.root3}>

            </Card>

        </Card>
    );
}
