import React, { useEffect, useState } from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import {TextField} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import Tabs from "../../component/tabs/tabs";
import { Divider } from 'antd';

import Hackheader from '../../component/hackheader/hackheader';
import {useParams} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from "firebase/auth";

import { db } from '../../firebaseConfig/firebaseConfig';
import {addDoc, collection, doc, arrayUnion, query, where, onSnapshot, updateDoc} from "firebase/firestore";

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
        width: "350px",
        Height:"300px",
        backgroundColor:"white",
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

export default function HackathonOverview(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render

    let { hackathonId } = useParams();
    const auth = getAuth();

    const [userParticipation, setUserParticipation] = React.useState(false);
    const [hackathon, setHackathon] = React.useState(false);



    useEffect(()=>{
        


    },[])

    return (
        <div>
            <Hackheader/>   
            <Tabs/>
            <Divider />
            <div className="w-75 mx-auto">
            Ship collision, train derailment and car accidents are just a few of the tragic events that have been a part of the headlines in recent times. This grave problem of safety and security in adverse conditions has piqued the public's interest and numerous studies have been done in past to reveal the susceptibility of functioning of transportation services owing to weather conditions.
 
 With the advancement in technology and emergence of a new field, intelligent transportation, automated determination of weather condition has become more relevant. Present systems either rely on series of expensive sensors or human assistance to identify the weather conditions. Help the meteorologist’s to channel their research in a direction where computer vision techniques have been used to classify the weather condition using a single image.
            </div>
        </div>
    );
}
