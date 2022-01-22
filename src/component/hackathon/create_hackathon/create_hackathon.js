import React, { useState} from 'react';
import {Input} from 'antd';
import {DatePicker, Space} from 'antd';
import 'antd/dist/antd.css';
import {Button,notification} from 'antd';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { db } from "../../../firebaseConfig/firebaseConfig";
import {useNavigate} from 'react-router-dom';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    arrayUnion,
    Timestamp, setDoc,

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
    const channelRef = collection(db, "channels");
    const navigate = useNavigate();


    function handleSubmit() {
        
        const auth = getAuth();
        onAuthStateChanged(auth, async user => {
            console.log(user.displayName, hackName,website,registrationDate._d,hackStartEnd[0]._d,hackStartEnd[1]._d,hackDescription.html.toString())

            // setHackathonData(user.displayName,
            //     user.email, user.uid, hackName, website, instagramAcc, registrationDate, hackStartEnd, hackDescription)

            // const hackathons = await collection(db, 'hackathons',uid);
            // console.log(uid)
            var id =  doc(hackathonCollectionRef).id
            console.log(id);
            const docRef = await setDoc(doc(db,`hackathons`,id),{
                "hackathon_id":id,
                "hackName": hackName.toString(),
                "organiser_name": user.reloadUserInfo.screenName,
                "organiser_email_id":arrayUnion( user.email.toString()),
                "website": website.toString(),
                "registrationDate": Timestamp.fromDate(registrationDate._d),
                "hackStart": Timestamp.fromDate(hackStartEnd[0]._d),
                "hackEnd": Timestamp.fromDate(hackStartEnd[1]._d),
                "hackDescription": hackDescription.html.toString(),
            });
            await setDoc(doc(db,`channels`,id),{
                "channel_id":id.toString(),
                "hackName": hackName.toString(),
                "organiser_name": user.reloadUserInfo.screenName,
                "organiser_email_id": user.email.toString(),
            }).then(data => {
                console.log(data)
            })
            var id2 =  doc(hackathonCollectionRef).id
            await addDoc(collection(db, "channels", id, "sub_channels_list"), {
                "sub_channel_id": id2,
                "sub_channel_name": "General Discussions",
                "sub_channel_code_name":"general_discussions",
                "channel_type": "message"
            })
            await addDoc(collection(db, "channels", id, "sub_channels_list"), {
                "sub_channel_id": id2,
                "sub_channel_name": "media",
                "sub_channel_code_name":"audio_video",
                "channel_type": "media"
            })


            await addDoc(collection(db, "channels", id, "general_discussions"), {
                "message": "General Discussions",
                "messageType": "message",
                "messageCreatedAt":Timestamp.fromDate(new Date())
            })

            await addDoc(collection(db, "channels", id, "audio_video"), {
                "message": "General Discussions",
                "messageType": "message",
                "messageCreatedAt":Timestamp.fromDate(new Date())
            })



            await addDoc(collection(db, "users", user.uid, "hackathons_organised"), {
                "hackName": hackName.toString(),
                "hack_uid": id.toString()

            }).then(data => {
                notification.success({
                    message: 'Hackathon Has been created',
                    // description:
                    //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                    // onClick: () => {
                    //   console.log('Notification Clicked!');
                    // },
                })
                navigate('/home', {replace: true})
            })
                .catch(error => {
                    notification.error({
                        message: 'Something went wrong',
                        // description:
                        //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                        // onClick: () => {
                        //   console.log('Notification Clicked!');
                        // },
                    })
                });



        });
    }

    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            width:500
        }}
        className="mx-auto"
        >
            <h5 className="mt-3">Hackathon Name</h5>
            <Input placeholder="hackathon Name" size="large" onChange={(e) => setHackName(e.target.value)}/>
            {/*<Input placeholder="Organiser Name" size="large" onChange={(e)=>setOrganiserName(e.target.value)}/>*/}
            {/*  <Input placeholder="Email Address" size="large" onChange={(e)=>setEmail(e.target.value)}/>*/}
            <h5 className="mt-3">Hackathon Website</h5>
            <Input placeholder="Hackathon Website"  size="large" onChange={(e) => setWebsite(e.target.value)}/>
            {/*<Input placeholder="Hackathon Instagram Account" size="large"*/}
            {/*       onChange={(e) => setInstagramAcc(e.target.value)}/>*/}

            <Space direction="vertical" size={12}>
                <h5 className="mt-3">Registration Start</h5>
                <DatePicker showTime onChange={(value, dateString) => setRegistrationDate(value)}/>
                <h5>Hackathon Start and End date</h5>
                <RangePicker showTime onChange={(value, dateString) => setHackStartEnd(value)}/>
            </Space>
            <h5 className="mt-3">Hackathon Description</h5>
            <MdEditor style={{height: '300px'}} renderHTML={text => mdParser.render(text)}
                      onChange={(html, text) => setHackDescription(html)}/>

            <Button className="mt-3" type="primary" onClick={handleSubmit}>Submit Button</Button>
        </div>);
}
