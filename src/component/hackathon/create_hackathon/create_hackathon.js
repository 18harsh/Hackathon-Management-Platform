import React, { useState} from 'react';
import {Input} from 'antd';
import {DatePicker, Space} from 'antd';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { db } from "../../../firebaseConfig/firebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    Timestamp,

} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";


const {RangePicker} = DatePicker;
const mdParser = new MarkdownIt(/* Markdown-it options */);


export default function Create_hackathon() {

    const [hackName, setHackName] = useState("");

    const [website, setWebsite] = useState("");
    // const [instagramAcc, setInstagramAcc] = useState("");
    const [registrationDate, setRegistrationDate] = useState("");
    const [hackStartEnd, setHackStartEnd] = useState([]);
    const [hackDescription, setHackDescription] = useState("");
    const hackathonCollectionRef = collection(db, "hackathons");
    const userCollection = collection(db, "users");



    function handleSubmit() {
        const auth = getAuth();
        onAuthStateChanged(auth, async user => {
            console.log(user.displayName, hackName,website,registrationDate._d,hackStartEnd[0]._d,hackStartEnd[1]._d,hackDescription.html.toString())

            // setHackathonData(user.displayName,
            //     user.email, user.uid, hackName, website, instagramAcc, registrationDate, hackStartEnd, hackDescription)

            // const hackathons = await collection(db, 'hackathons',uid);
            // console.log(uid)
            const docRef = await addDoc(hackathonCollectionRef,{
                "hackName": hackName.toString(),
                "organiser_name": user.displayName.toString(),
                "organiser_email_id": user.email.toString(),
                "website": website.toString(),
                "registrationDate": Timestamp.fromDate(registrationDate._d),
                "hackStart": Timestamp.fromDate(hackStartEnd[0]._d),
                "hackEnd": Timestamp.fromDate(hackStartEnd[1]._d),
                "hackDescription": hackDescription.html.toString(),
            });

            await addDoc(collection(db,"users",user.uid,"hackathons_organised"),{
                "hackName": hackName.toString(),
                "hack_uid":docRef.id

            });

        });
    }

    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            width:500
        }}>
            <Input placeholder="hackathon Name"  size="large" onChange={(e) => setHackName(e.target.value)}/>
            {/*<Input placeholder="Organiser Name" size="large" onChange={(e)=>setOrganiserName(e.target.value)}/>*/}
            {/*  <Input placeholder="Email Address" size="large" onChange={(e)=>setEmail(e.target.value)}/>*/}
            <Input placeholder="Hackathon Website"  size="large" onChange={(e) => setWebsite(e.target.value)}/>
            {/*<Input placeholder="Hackathon Instagram Account" size="large"*/}
            {/*       onChange={(e) => setInstagramAcc(e.target.value)}/>*/}

            <Space direction="vertical" size={12}>
                <h5>Registration Start</h5>
                <DatePicker showTime onChange={(value, dateString) => setRegistrationDate(value)}/>
                <h5>Hackathon Start and End date</h5>
                <RangePicker showTime onChange={(value, dateString) => setHackStartEnd(value)}/>
            </Space>

            <MdEditor style={{height: '300px'}} renderHTML={text => mdParser.render(text)}
                      onChange={(html, text) => setHackDescription(html)}/>

            <Button type="primary" onClick={handleSubmit}>Submit Button</Button>
        </div>);
}
