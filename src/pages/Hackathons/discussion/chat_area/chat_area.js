
import React, {useEffect} from 'react'
import Grid from "@mui/material/Grid";
import {Divider, Fab, List, ListItem,  ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SendIcon from '@mui/icons-material/Send';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {collection, onSnapshot, query, orderBy, addDoc, Timestamp} from "firebase/firestore";
import {db} from "../../../../firebaseConfig/firebaseConfig";
import FormTextField from "../../../../components/textfield/formTextField";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import VideoSdkComponent from "../video_api";


export default function RightPanel(props) {

    const userState = useSelector((state) => state.user);

    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [userMessage, setUserSent] = React.useState([]);
    useEffect(() => {
        if (props.channelType === "message") {


            const particpiapntRef = collection(db, "channels", props.hackathhonId, props.currentRoom);
            const q = query(particpiapntRef, orderBy("messageCreatedAt", "asc"));
            onSnapshot(q, (querySnapshot) => {
                const hack = [];
                const hack1 = [];
                querySnapshot.forEach((doc) => {
                    // console.log({document:doc.data(),docId:doc.id})
                    hack.push(doc.data());
                    hack1.push({document:doc.data(),docId:doc.id});
                });
                // console.log("hack 1"+hack1)
                setMessages(hack1);
                if (hack.length !== 0) {


                }
                // console.log(hack1)

            });
            setLoading(true);
        } else if (props.channelType === "media") {
                console.log(props.subChannelId)
        }
    }, [props.channelType,props.currentRoom,props.hackathhonId,props.subChannelId]);

    const onSearch = async () => {
        // console.log(userMessage);
        if (userMessage !== "") {


            await addDoc(collection(db, "channels", props.hackathhonId, props.currentRoom), {
                "message": userMessage,
                "messageType": "message",
                "messageCreatedAt": Timestamp.fromDate(new Date()),
                "uid": userState.userId,
                "user_display_image": userState.photoURL,

            })

        }
        // const scrollTopButton = document.getElementById('scrollTopButton');

        // scrollTopButton.addEventListener('click', () => {
        //     window.scrollTo(0, document.body.scrollHeight);
        // });
    };
    // console.log(messages)
    if(loading === false ) {
        return <div></div>
    }
    return (
        <div style={{
            padding: 10
        }}>

            <Grid container style={{
                width: '100%',
                height: '80vh',
                backgroundColor: "rgb(10 25 41 / 0%)",
                border: "1px solid #1976d2",
                borderRadius: "11px"
            }}>
                {props.channelType === 'media' && props.subChannelId !==''?<VideoSdkComponent hackathonId={props.hackathhonId} meetingId={props.subChannelId} userName={props.userName} />:<div/>

                }
                {props.channelType === 'message' ? <><React.Fragment>
                    <AppBar position="static" style={{
                        height: 70,
                        borderRadius: "11px",
                        backgroundColor:"rgb(10,25, 41,0%)",
                    }}>
                        <Toolbar>
                            <Typography  sx={{ mr: 2,fontSize:"25px",color:"#1976d2", display: { xs: 'none', md: 'flex' } }}  >

                            # {props.currentRoomName}
                        </Typography>

                    </Toolbar>
                    </AppBar>
                </React.Fragment>
                <Grid item xs={15}>
                    <List style={{
                        display: "flex",
                        flexDirection: "column",
                        overflowY: 'auto',
                        height: 550,
                        scrollbarWidth:0,

                    }}>
                        {props.channelType === "message" && messages.map((value) => {

                            if(userState.userId === value.document.uid) {

                               return <ListItem key={value.docId} style={{
                                    backgroundColor: "#1976d2",
                                    margin: 10,
                                    width: 400,
                                    borderRadius: "11px",
                                    alignSelf: "flex-end"

                                }}>

                                    <Grid container style={{
                                        marginRight:15
                                    }}>
                                        <Grid item xs={12}>
                                            <ListItemText align="left" primaryTypographyProps={{
                                                color:"white",fontSize:18
                                            }} primary={value.document.message}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText align="left" secondaryTypographyProps={{
                                                color:"white",
                                                fontSize:15
                                            }} secondary={value.document.messageCreatedAt.toDate().toLocaleTimeString()}/>
                                        </Grid>
                                    </Grid>
                                   <Avatar
                                       src={value.document.user_display_image === null ? `https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg` : value.document.user_display_image}/>

                               </ListItem>;

                            } else {
                                return <ListItem key={value.docId} style={{
                                    backgroundColor: "#1976d2",
                                    margin: 10,
                                    width: 400,
                                    borderRadius: "11px"
                                }} >
                                    <Avatar
                                        src={value.document.user_display_image === null ? `https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg` : value.document.user_display_image}/>

                                    <Grid container style={{
                                        marginLeft:15
                                    }}>

                                        <Grid item xs={12}>
                                            <ListItemText align="left" primary={value.document.message}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText align="left" secondary={value.document.messageCreatedAt.toDate().toLocaleTimeString()}/>
                                        </Grid>
                                    </Grid>
                                </ListItem>;

                            }

                            // <Message message={value.message} image={value.user_display_image}
                            //                 name={value.user_name} time={value.messageCreatedAt}/>;
                        })}




                    </List>
                    <Divider/>
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={11}>
                            <FormTextField  sx={{input: {color: '#1976d2'}, mt: 2}} id="outlined-basic-email" label="Type Something" onChange={value=>setUserSent(value.target.value)} fullWidth/>
                        </Grid>
                        <Grid xs={1} style={{
                            marginTop:11
                        }} align="right">
                            <Fab style={{
                                backgroundColor:"#1976d2"
                            }}  onClick={onSearch} >
                                <SendIcon  sx={{ color: "white",transform:"rotate(-45deg)" }}/>
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid> </>:<div/>}
            </Grid>
        </div>
    );
}

