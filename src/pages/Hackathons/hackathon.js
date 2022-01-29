import React from "react";


import {Outlet} from 'react-router-dom';
import Tabs from "../../components/tabs/tabs";


const Hackathon = ()=> {


    // handleEditorChange({ html, text }) {
    //     console.log('handleEditorChange', html, text);
    // }





        return (
            <div style={{
                display:"flex",
                flexDirection:"column"
            }}>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center"
                }}>
                    <Tabs/>
                </div>
                <Outlet/>
            </div>


        );


}


export default Hackathon;
// export default Homepage;


