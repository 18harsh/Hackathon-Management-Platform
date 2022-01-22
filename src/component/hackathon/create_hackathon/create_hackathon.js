import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';


const { RangePicker } = DatePicker;
const mdParser = new MarkdownIt(/* Markdown-it options */);







export default function Create_hackathon() {

    const [hackName, setHackName] = useState("");
    const [organiserName, setOrganiserName] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [instagramAcc, setInstagramAcc] = useState("");
    const [registrationDate, setRegistrationDate] = useState("");
    const [hackStartEnd, setHackStartEnd] = useState([]);
    const [hackDescription, setHackDescription] = useState("");

    function handleSubmit(){
        console.log(hackDescription);
    }

  return (
  <div className="row">
      <Input placeholder="hackathon Name" size="large" onChange={(e)=>setHackName(e.target.value)}/>
      <Input placeholder="Organiser Name" size="large" onChange={(e)=>setOrganiserName(e.target.value)}/>
        <Input placeholder="Email Address" size="large" onChange={(e)=>setEmail(e.target.value)}/>
        <Input placeholder="Hackathon Website" size="large" onChange={(e)=>setWebsite(e.target.value)}/>
        <Input placeholder="Hackathon Instagram Account" size="large" onChange={(e)=>setInstagramAcc(e.target.value)}/>

           <Space direction="vertical" size={12}>
               <h5>Registration Start</h5>
                <DatePicker showTime onChange={(value, dateString)=>setRegistrationDate(value)} />
                <h5>Hackathon Start and End date</h5>
                <RangePicker showTime onChange={(value, dateString)=>setHackStartEnd(value)}/>
            </Space>

            <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={(html,text)=>setHackDescription(html)} />

            <Button type="primary" onClick={handleSubmit}>Submit Button</Button>
  </div>);
}
