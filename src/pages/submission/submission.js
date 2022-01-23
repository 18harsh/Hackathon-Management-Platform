import React, {useEffect, useState} from 'react';

import {makeStyles} from "@material-ui/core/styles";
import Tabs from '../../component/tabs/tabs';
import {Input} from 'antd';
import {Button,notification} from 'antd';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {useParams} from "react-router-dom";
import {arrayUnion, collection, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../firebaseConfig/firebaseConfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";



const mdParser = new MarkdownIt(/* Markdown-it options */);


const useStyles = makeStyles({

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

export default function Submission(props) {
    let {hackathonId} = useParams();
    const [repoName, setRepoName] = useState("");
    const [repoOwner, setRepoOwner] = useState("");
    const [repoWebsite, setRepoWebsite] = useState("");
    const [projectFeature, setProjectFeature] = useState("");

    const [participantId, setParticipantId] = useState("");

    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, async user => {
            const particpiapntRef = collection(db, "hackathons", hackathonId, "participants");
            const q = query(particpiapntRef, where("hackathon_email_id_creator", "==", user.email));

            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                const hack = [];
                querySnapshot.forEach((doc) => {
                    hack.push({hackathons: doc.data(), hackathonId: doc.id});
                });
                setParticipantId(hack[0].hackathonId)
                console.log(hack)
               });
        });


    }, []);



    async function handleSubmit() {

        await updateDoc(doc(db, `hackathons/${hackathonId}/participants`, participantId), {
            "repoName":repoName,
            "repoOwner":repoOwner,
            "repoWebsite": repoWebsite,
            "projectFeature":projectFeature.html
        }).then(data=>{
            notification.success({
                message: 'Project Submitted Successfully',
                // description:
                //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                // onClick: () => {
                //   console.log('Notification Clicked!');
                // },
            })
        });
    }


    return (<div className="">
            < Tabs/>

            <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            width:500
        }}
        className="mx-auto"
        >
            <h5 className="mt-3">Github Repository Name</h5>
            <Input placeholder="Github Repository Name" size="large" onChange={(e) => setRepoName(e.target.value)}/>
                <h5 className="mt-3">Github Repository Owner</h5>
                <Input placeholder="Github User Id" size="large" onChange={(e) => setRepoOwner(e.target.value)}/>


                <h5 className="mt-3">Github Repository Link</h5>
            <Input placeholder="Github Repository Link"  size="large" onChange={(e) => setRepoWebsite(e.target.value)}/>
            
            <h5 className="mt-3">Project Features</h5>
            <MdEditor style={{height: '300px'}} renderHTML={text => mdParser.render(text)}
                      onChange={(html, text) => setProjectFeature(html)}/>

            <Button className="mt-3" type="primary" onClick={handleSubmit}>Submit Button</Button>
        </div>

        </div>
    );

}
