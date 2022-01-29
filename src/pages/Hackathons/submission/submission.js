import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { collection, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../../firebaseConfig/firebaseConfig";
import Tabs from "../../../components/tabs/tabs";
import Typography from "@mui/material/Typography";
import FormTextField from "../../../components/textfield/formTextField";
import MDEditor from "@uiw/react-md-editor";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import { snackBarActions} from "../../../redux";
import {bindActionCreators} from "redux";



export default function Submission(props) {
    let {hackathonId} = useParams();
    const dispatch = useDispatch();

    const userState = useSelector((state) => state.user);
    const { snackBarShow } = bindActionCreators(snackBarActions, dispatch);

    const [loading, setLoading] = useState(true);
    const [loadingTeamLeader, setLoadingForTeamLeader] = useState(true);


    const [participantId, setParticipantId] = useState("");


    useEffect(() => {


            const particpiapntRef = collection(db, "hackathons", hackathonId, "participants");
            const q = query(particpiapntRef, where("hackathon_email_id_creator", "==", userState.emailId));

            onSnapshot(q, async (querySnapshot) => {
                const hack = [];
                querySnapshot.forEach((doc) => {
                    hack.push({hackathons: doc.data(), hackathonId: doc.id});
                });
                console.log(hack)
                if(hack.length != null) {
                    setParticipantId(hack[0].hackathonId)
                    if (hack[0].hackathons.hackathon_email_id_creator === userState.emailId){
                        setLoadingForTeamLeader(false)
                    } else {
                        setLoadingForTeamLeader(true)
                    }
                    console.log(hack)
                    setLoading(false)
                } else {
                    setLoading(true)
                }

               });



    }, [hackathonId,userState]);



    const formik = useFormik({
        initialValues: {
            // hackathonName: null,
            // hackathonWebsite: null,
            // hackathonDescription: null,
            // registrationStartDate: null,
            // startDate: null,
            // endDate: null,
            repoName: "Covid-Tracker-in-React-JS",
            repoOwner: "reuben21",
            repoWebsite: "https://github.com/reuben21/Covid-Tracker-in-React-JS",
            projectFeature: null,

        },

        onSubmit: (values) => {
            // const formData = JSON.stringify(values, null, 2);
            const repoName = values.repoName
            const repoOwner = values.repoOwner
            const repoWebsite = values.repoWebsite
            const projectFeature = values.projectFeature

            console.log(values)
            handleSubmit(repoName,repoOwner,repoWebsite,projectFeature);
        },
    });

    async function handleSubmit(repoName,repoOwner,repoWebsite,projectFeature) {

        await updateDoc(doc(db, `hackathons/${hackathonId}/participants`, participantId), {
            "repoName":repoName,
            "repoOwner":repoOwner,
            "repoWebsite": repoWebsite,
            "projectFeature":projectFeature
        }).then(data=>{
            snackBarShow(true,'success','Project Updated Successfully')
        });
    }
    if(loadingTeamLeader) {
        return <div style={{
            display: "flex",
            justifyContent: "center",


        }}>
            <Typography  sx={{ mr: 2,fontSize:"25px",color:"#1976d2", display: { xs: 'none', md: 'flex' } }}  >
                Your Team Leader Has to Submit his Project
            </Typography>
        </div>
    }

    if(loading) {
        return <div style={{
            display: "flex",
            justifyContent: "center",


        }}>
            <Typography  sx={{ mr: 2,fontSize:"25px",color:"#1976d2", display: { xs: 'none', md: 'flex' } }}  >
                You must Participate in the Project
            </Typography>
        </div>
    }


    return (<div className="">
            <Tabs/>

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
                        Submit your Project
                    </Typography>
                    <FormTextField
                        sx={{input: {color: '#1976d2'}, mt: 2}}
                        fullWidth
                        id="repoName"
                        name="repoName"
                        label="Repo Name"
                        value={formik.values.repoName}
                        onChange={formik.handleChange}
                        error={formik.touched.repoName && Boolean(formik.errors.repoName)}
                        helperText={formik.touched.repoName && formik.errors.repoName}
                    />
                    <FormTextField
                        sx={{input: {color: '#1976d2'}, mt: 2}}
                        fullWidth
                        id="repoOwner"
                        name="repoOwner"
                        label="Repo Owner"
                        value={formik.values.repoOwner}
                        onChange={formik.handleChange}
                        error={formik.touched.repoOwner && Boolean(formik.errors.repoOwner)}
                        helperText={formik.touched.repoOwner && formik.errors.repoOwner}
                    />

                    <FormTextField
                        sx={{input: {color: '#1976d2'}, mt: 2}}
                        fullWidth
                        id="repoWebsite"
                        name="repoWebsite"
                        label="Repo Link"
                        value={formik.values.repoWebsite}
                        onChange={formik.handleChange}
                        error={formik.touched.repoWebsite && Boolean(formik.errors.repoWebsite)}
                        helperText={formik.touched.repoWebsite && formik.errors.repoWebsite}
                    />
                    <div className="container">
                        <MDEditor
                            style={{marginTop:10}}
                            value={formik.values.projectFeature}
                            onChange={value =>{ formik.setFieldValue("projectFeature", value)}}
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
        </div>
    );

}
