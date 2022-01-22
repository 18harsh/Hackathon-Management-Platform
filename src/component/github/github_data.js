import React, {useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';


import {Octokit} from "@octokit/core";

const octokit = new Octokit({auth: "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"});

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

export default function Github_data(props) {
    const [roomName, setRoomName] = React.useState("");
    const classes = useStyles();

    // getModalStyle is not a pure function, we roll the style only on the first render

    useEffect(async () => {

        await octokit.request('GET /repos/{owner}/{repo}/branches', {
            owner: '18harsh',
            repo: 'Whatsapp-Clone',
        }).then(res=>{
            console.log(res);
        })

        await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: '18harsh',
            repo: 'Whatsapp-Clone',
        }).then(res=>{
            // console.log(res);
        })

        // await octokit.request('GET /repos/{owner}/{repo}/collaborators', {
        //     owner: '18harsh',
        //     repo: 'A-Study-On-The-Insights-Data-Set'
        // }).then(res=>{
        //     console.log(res);
        // })

    },[])

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <Card className={classes.root}>

        </Card>
    );
}
