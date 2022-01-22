import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Card} from 'antd';
import { Avatar } from "@material-ui/core";

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#325288 !important',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "15px",
        margin: 5,
        width: "100%",
        textTransform: "none",
        border: "1px solid #325288"
    },
}))(Button);


const useStyles = makeStyles({
    root: {
        width: "25%",
        minHeight: "800px",
        backgroundColor: "#FAEEE7",
        margin: 10
    },
    paper: {
        position: 'absolute',
        width: 300,
        display: "flex",
        flexDirection: "column",

        backgroundColor: "#FAEEE7",
        border: '2px solid #000',
        boxShadow: "#FAEEE7",
        padding: 10,
    },
});

export default function Message({message, type}) {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
        return (


            <div className="site-card-border-less-wrapper" className="p-2"  style={{
                alignSelf: "flex-start",width: 300, backgroundColor: "#1b508b", borderRadius: 5, margin: 15}}>
                
                <div className="d-flex">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`}/>
                <h6 className="text-light p-2">
                    Harsh
                </h6>
                </div>
                <div className="text-light">
                    Isko Dynamic bana
                </div>
            </div>

        );
   

}
