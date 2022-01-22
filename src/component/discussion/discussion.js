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

    console.log(hackathonId)

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth,user => {

            const particpiapntRef = collection(db, "channels");
            const q = query(particpiapntRef);
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const hack = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.data)
                    hack.push(doc.data());
                });
                if (hack.length !== 0) {


                }
                console.log(hack)

            });

        })





        console.log(auth.currentUser)
    })

    




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
                <LeftPanel/>
                
            </div>
            <div
                style={{
                    flex:0.8
                }}
            >
                <RightPanel/>
                
            </div>
               
                
            </div>
            </div>
        );


}

// export default Homepage;

// <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
