import React, {useEffect, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tabs from "../../component/tabs/tabs";
import {Divider} from 'antd';
import Hackheader from '../../component/hackheader/hackheader';
import {useParams} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {db} from '../../firebaseConfig/firebaseConfig';
import {addDoc, collection, doc, arrayUnion, query, where, onSnapshot, updateDoc} from "firebase/firestore";

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
        width: "350px",
        Height: "300px",
        backgroundColor: "white",
        margin: 10
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
        display: "flex",
        flexDirection: "column",

        backgroundColor: "#FAEEE7",
        border: '2px solid #000',
        boxShadow: "#FAEEE7",
        padding: 10,
    },
});

export default function HackathonOverview(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render

    let {hackathonId} = useParams();
    const auth = getAuth();

    const [userParticipation, setUserParticipation] = React.useState(false);
    const [hackathon, setHackathon] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    console.log(hackathon,"////")

    useEffect(() => {

        const particpiapntRef = collection(db, "hackathons");
        const q = query(particpiapntRef, where("hackathon_id", "==", hackathonId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const hack = [];
            querySnapshot.forEach((doc) => {
                hack.push(doc.data());
            });
            if (hack.length !== 0) {

                setHackathon(hack)
            }
            console.log(hack)
            setLoading(true)
        });


    }, [])
    if(loading === true) {
        return (
            <div>
                <Hackheader hackathon={hackathon[0]}/>
                <Tabs/>
                <Divider/>
                <div className="w-75 mx-auto">
                    <div
                        dangerouslySetInnerHTML={{__html: hackathon[0].hackDescription
                            !== undefined ? hackathon[0].hackDescription : "<p>Details comming soon</p>>"}}/>
                </div>
            </div>
        );
    }
    return (
        <div></div>
    );


}
