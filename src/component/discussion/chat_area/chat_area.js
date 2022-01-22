import React from 'react';
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

    },

});

const onSearch = value => console.log(value);


export default function RightPanel() {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <Card className={"mx-2 mt-2"}>
                    <ColorButton size="small" className="mb-2">#announcments</ColorButton>
            </Card>
            <div className={classes.root4}>
                <Message message={"Hello"} type={"1"}/>
                <Message message={"Hello"} type={"2"}/>
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
