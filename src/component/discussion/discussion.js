import React,{useEffect} from "react";

import {NavLink,useParams} from 'react-router-dom';
import 'react-markdown-editor-lite/lib/index.css';
import {getAuth,  onAuthStateChanged} from "firebase/auth";
import LeftPanel from "./left_panel/left_panel";
import RightPanel from "./chat_area/chat_area";
import Tabs from "../tabs/tabs";


export default function Discussion(props) {

    let { hackathonId } = useParams();

    console.log(hackathonId)

    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth,user => {

            this.setState({
                isAuth: !!user,
            })

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
                display:"flex",
                alignItems:"stretch",
                flexDirection:"row",
                height:"100%",
                width:"100%"
            }}>

               <LeftPanel></LeftPanel>
                <RightPanel/>
            </div>
            </div>
        );


}

// export default Homepage;

// <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
