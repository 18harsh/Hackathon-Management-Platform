import React from 'react';

import {useFormik} from 'formik';


import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MDEditor from '@uiw/react-md-editor';
import FormTextField from "../../../components/textfield/formTextField";
import {collection, doc,addDoc, setDoc,arrayUnion, Timestamp} from "firebase/firestore";
import {db} from "../../../firebaseConfig/firebaseConfig";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import { snackBarActions } from "../../../redux/index";
import { useNavigate} from "react-router-dom";

// const validationSchema = yup.object({
//     hackathonName: yup
//         .string('Enter your Hackathon Name')
//         .required('Hackathon Name is required'),
//     hackathonWebsite: yup
//         .string('Enter your Hackathon Name')
//         .required('Hackathon Name is required'),
//     hackathonDescription: yup
//         .string('Enter your Hackathon Name')
//         .required('Hackathon Name is required'),
//     registrationStartDate: yup.date().nullable(),
//     startDate: yup.date.nullable(),
//     endDate: yup.date.nullable(),
// });

const HackathonCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hackathonCollectionRef = collection(db, "hackathons");
    const userState = useSelector((state) => state.user);

    const { snackBarShow } = bindActionCreators(snackBarActions, dispatch);

    const formik = useFormik({
        initialValues: {
            // hackathonName: null,
            // hackathonWebsite: null,
            // hackathonDescription: null,
            // registrationStartDate: null,
            // startDate: null,
            // endDate: null,
            hackathonName: "Unscript 2k22",
            hackathonWebsite: "wwww.crceunscript.com",
            hackathonDescription: "### Hello Participants",
            registrationStartDate: null,
            startDate: null,
            endDate: null,
        },

        onSubmit: (values) => {
            // const formData = JSON.stringify(values, null, 2);
            const hackathonName = values.hackathonName
            const hackathonWebsite = values.hackathonWebsite
            const hackathonDescription = values.hackathonDescription
            const registrationStartDate = values.registrationStartDate
            const startDate = values.startDate
            const endDate = values.endDate
            console.log(values)
            handleSubmit(hackathonName,hackathonWebsite,hackathonDescription,registrationStartDate,startDate,endDate);
        },
    });

    async function handleSubmit(hackathonName,hackathonWebsite,hackathonDescription,registrationStartDate,startDate,endDate) {


        // setHackathonData(user.displayName,
        //     user.email, user.uid, hackName, website, instagramAcc, registrationDate, hackStartEnd, hackDescription)

        // const hackathons = await collection(db, 'hackathons',uid);
        // console.log(uid)
        var id = doc(hackathonCollectionRef).id
        console.log(id);
        await setDoc(doc(db, `hackathons`, id), {
            "hackathon_id": id,
            "hackName": hackathonName.toString(),
            "organiser_email_id": arrayUnion(userState.emailId.toString()),
            "website": hackathonWebsite.toString(),
            "registrationDate": Timestamp.fromDate(registrationStartDate),
            "hackStart": Timestamp.fromDate(startDate),
            "hackEnd": Timestamp.fromDate(endDate),
            "hackDescription": hackathonDescription.toString(),
        });
        await setDoc(doc(db, `channels`, id), {
            "channel_id": id.toString(),
            "hackName": hackathonName.toString(),
            "organiser_email_id": userState.emailId.toString(),
        }).then(data => {
            console.log(data)
        })
        var id2 = doc(hackathonCollectionRef).id
        await addDoc(collection(db, "channels", id, "sub_channels_list"), {
            "sub_channel_id": id2,
            "sub_channel_name": "General Discussions",
            "sub_channel_code_name": "general_discussions",
            "channel_type": "message"
        })
        await addDoc(collection(db, "channels", id, "sub_channels_list"), {
            "sub_channel_id": id2,
            "sub_channel_name": "media",
            "sub_channel_code_name": "audio_video",
            "channel_type": "media"
        })


        await addDoc(collection(db, "channels", id, "general_discussions"), {
            "message": "Start of General Discussions",
            "messageType": "message",
            "uid":userState.userId,
            "messageCreatedAt": Timestamp.fromDate(new Date())
        })

        await addDoc(collection(db, "channels", id, "audio_video"), {
            "message": "General Discussions",
            "messageType": "message",
            "uid":userState.userId,
            "messageCreatedAt": Timestamp.fromDate(new Date())
        })


        await addDoc(collection(db, "users", userState.userId, "hackathons_organised"), {
            "hackName": hackathonName.toString(),
            "hack_uid": id.toString()

        }).then(data => {

            snackBarShow(true,'success','Hackathon Created Successfully')
            navigate('/home', {replace: true})
        })
            .catch(error => {

            });


    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",


        }}>

            <form onSubmit={formik.handleSubmit} style={{
                width: 600,
                display: "flex",
                justifyContent: "center",
                flexDirection:"column"
            }}>
                <Typography  sx={{ mr: 2,fontSize:"25px",color:"#1976d2", display: { xs: 'none', md: 'flex' } }}  >
                    Organize a Hackathon
                </Typography>
                <FormTextField
                    sx={{input: {color: '#1976d2'}, mt: 2}}
                    fullWidth
                    id="hackathonName"
                    name="hackathonName"
                    label="Hackathon Name"
                    value={formik.values.hackathonName}
                    onChange={formik.handleChange}
                    error={formik.touched.hackathonName && Boolean(formik.errors.hackathonName)}
                    helperText={formik.touched.hackathonName && formik.errors.hackathonName}
                />
                <FormTextField
                    sx={{input: {color: '#1976d2'}, mt: 2}}
                    fullWidth
                    id="hackathonWebsite"
                    name="hackathonWebsite"
                    label="Hackathon Website"
                    value={formik.values.hackathonWebsite}
                    onChange={formik.handleChange}
                    error={formik.touched.hackathonWebsite && Boolean(formik.errors.hackathonWebsite)}
                    helperText={formik.touched.hackathonWebsite && formik.errors.hackathonWebsite}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <FormTextField sx={{input: {color: '#1976d2'}, mt: 2}} {...props} />}
                        label="Registration Start Date"
                        value={formik.values.registrationStartDate}
                        onChange={value =>{
                            var date = new Date(value);
                            formik.setFieldValue("registrationStartDate", date)
                        }}
                    />
                </LocalizationProvider>
                <br/>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <FormTextField sx={{input: {color: '#1976d2'}, mt: 2}} {...props} />}
                        label="Start Date"
                        value={formik.values.startDate}
                        onChange={value => formik.setFieldValue("startDate", value)}
                    />
                </LocalizationProvider>
                <br/>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <FormTextField sx={{input: {color: '#1976d2'}, mt: 2}} {...props} />}
                        label="End Date"
                        value={formik.values.endDate}
                        onChange={value => formik.setFieldValue("endDate", value)}

                    />
                </LocalizationProvider>
                <div className="container">
                    <MDEditor
                        style={{marginTop:10}}
                        value={formik.values.hackathonDescription}
                        onChange={value =>{ formik.setFieldValue("hackathonDescription", value)}}
                    />

                </div>

                <Button size="small" fullWidth type="submit"  style={{
                    borderRadius: '11px',width:"100%",marginTop:10,
                    color:"white",
                    backgroundColor:"#1976d2",
                    border:"2px solid #1976d2"
                }}
                >
                    <Typography variant="h6" component="h2" sx={{ color:"white"}}  >

                        SUBMIT
                    </Typography>
                </Button>;
            </form>
        </div>
    );
};

export default HackathonCreate;

