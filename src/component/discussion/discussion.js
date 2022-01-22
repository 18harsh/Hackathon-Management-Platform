import React,{useEffect} from "react";

import {NavLink,useParams} from 'react-router-dom';
import 'react-markdown-editor-lite/lib/index.css';
import {getAuth,  onAuthStateChanged} from "firebase/auth";
import LeftPanel from "./left_panel/left_panel";
import RightPanel from "./chat_area/chat_area";
import Tabs from "../tabs/tabs";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../firebaseConfig/firebaseConfig";


export default function Discussion(props) {

    let { hackathonId } = useParams();
    const [roomList, setRoomList] = React.useState([]);
    const [currentRoom, setCurrenRoom] = React.useState("general_discussions");
    const [currentRoomName, setCurrentRoomName] = React.useState("General Discussions");
    const [currentChannelType, setChannelType] = React.useState("message");
    const [subChannelId, setSubChannelId] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    console.log(hackathonId)

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth,user => {

            const particpiapntRef = collection(db, "channels",hackathonId,"sub_channels_list");
            const q = query(particpiapntRef);
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const hack = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data)
                    hack.push(doc.data());
                });
                if (hack.length !== 0) {
                    setRoomList(hack);
                    setUserName(user.email)
                }
                console.log(hack)

            });

        })
        setLoading(true)






        console.log(auth.currentUser)
    },[])

    function changeRooms(value) {
        console.log(value.channel_type);
        setCurrenRoom(value.sub_channel_code_name);
        setCurrentRoomName(value.sub_channel_name);
        setChannelType(value.channel_type);
        setSubChannelId(value.sub_channel_id);

    }
    


if(loading) {
    return (
        <div style={{
            display:"flex",
            flexDirection:"column"
        }}>
            <Tabs/>

            <div style={{
                display:"flex"
            }}>

                <div
                    style={{
                        flex:0.2
                    }}
                >
                    <LeftPanel sub_channels={roomList} hackathhonId={hackathonId} changeRooms={changeRooms}/>

                </div>
                <div
                    style={{
                        flex:0.8
                    }}
                >
                     <RightPanel currentRoom={currentRoom} userName={userName} subChannelId={subChannelId} channelType={currentChannelType} hackathhonId={hackathonId} currentRoomName={currentRoomName} />

                </div>


            </div>
        </div>
    );
}
return <div></div>




}

// export default Homepage;

// <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
