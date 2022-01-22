import React, { useState } from 'react';

import {makeStyles} from "@material-ui/core/styles";
import Tabs from '../../component/tabs/tabs';
import {Input} from 'antd';
import {Button,notification} from 'antd';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';



const mdParser = new MarkdownIt(/* Markdown-it options */);


const useStyles = makeStyles({

    paper: {
        position: 'absolute',
        width: 300,
        display:"flex",
        flexDirection:"column",

        backgroundColor: "#FAEEE7",
        border: '2px solid #000',
        boxShadow: "#FAEEE7",
        padding: 10,
    },
});

export default function Submission(props) {

    const [repoName, setRepoName] = useState("");
    const [repoWebsite, setRepoWebsite] = useState("");
    const [projectFeature, setProjectFeature] = useState("");


    function handleSubmit() {
        
    }


    return (<div className="">
            < Tabs/>

            <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            width:500
        }}
        className="mx-auto"
        >
            <h5 className="mt-3">Github Repository Name</h5>
            <Input placeholder="Github Repository Name" size="large" onChange={(e) => setRepoName(e.target.value)}/>
            <h5 className="mt-3">Github Repository Link</h5>
            <Input placeholder="Github Repository Link"  size="large" onChange={(e) => setRepoWebsite(e.target.value)}/>
            
            <h5 className="mt-3">Project Features</h5>
            <MdEditor style={{height: '300px'}} renderHTML={text => mdParser.render(text)}
                      onChange={(html, text) => setProjectFeature(html)}/>

            <Button className="mt-3" type="primary" onClick={handleSubmit}>Submit Button</Button>
        </div>

        </div>
    );

}
