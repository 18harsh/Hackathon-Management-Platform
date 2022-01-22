import React, {useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssTextField from "../../TextField/TextField";
import Message from "../messages/message";

import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import {addDoc, collection,orderBy, onSnapshot, query, Timestamp} from "firebase/firestore";
import {db} from "../../../firebaseConfig/firebaseConfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import VideoAudio from "../../video_audio/VideoAudio";

const { Search } = Input;


const ColorButton = withStyles((theme) => ({
    root: {
        color: '#325288 !important',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "15px",
        marginTop:"10px",
        marginRight:"10px",
        width:"100%",
       textTransform:"none",
       
    },
}))(Button);


const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"column",
        // minHeight:"100vh",
        margin:'10px',

    },
    root2: {
        width: "98%",
        height:"45px",
        backgroundColor:"#",
        margin:10,
        border:"1px solid #325288",
        alignSelf:"flex-start",
        alignItems:"flex-start"
    },
    root3: {
        minHeight:"50px",
        backgroundColor:"#",
        margin:10,
        border:"1px solid #325288",

    },
    root4: {
        display:"flex",
        flexDirection:"column",
        height:"65vh",
        backgroundColor:"#",
        margin:10,
        overflow: "auto",
    },

});




export default function RightPanel(props) {
    const classes = useStyles();
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        if(props.channelType === "message") {


            const particpiapntRef = collection(db, "channels", props.hackathhonId, props.currentRoom);
            const q = query(particpiapntRef,orderBy("messageCreatedAt", "asc"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const hack = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data)
                    hack.push(doc.data());
                });
                if (hack.length !== 0) {
                    setMessages(hack);

                }
                console.log(hack)

            });
            setLoading(true);
        } else if (props.channelType === "media") {

        }
    }, []);


    const onSearch = async value => {

        if(value != ""){
        const auth = getAuth();
        onAuthStateChanged(auth,async user => {
            await addDoc(collection(db, "channels", props.hackathhonId, "general_discussions"), {
                "message":value,
                "messageType": "message",
                "messageCreatedAt": Timestamp.fromDate(new Date()),
                "user_name":user.reloadUserInfo.screenName,
                "user_display_image":user.photoURL,

            })
        });
    }
        // const scrollTopButton = document.getElementById('scrollTopButton');

        // scrollTopButton.addEventListener('click', () => {
        //     window.scrollTo(0, document.body.scrollHeight);
        // });
    };
    if(loading) {
        return (
            <Card className={classes.root}>
                <Card className={"mx-2 mt-2"}>
                    <ColorButton size="small" className="mb-2">{props.currentRoomName}</ColorButton>
                </Card>
                {props.channelType === 'media' && props.subChannelId !==''?<VideoAudio meetingId={props.subChannelId} userName={props.userName}/>:<div/>

                }

                <div className={`${classes.root4} scrollTopButton`}>
                    {props.channelType === "message" && messages.map((value)=>{
                        return   <Message message={value.message} image={value.user_display_image}
                                          name={value.user_name} time={value.messageCreatedAt} />;
                    })}


                </div>
                <div className="p-2">
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Send"
                        size="large"
                        onSearch={onSearch}
                    />
                </div>

            </Card>
        );
    }
    return <div/>;


}
