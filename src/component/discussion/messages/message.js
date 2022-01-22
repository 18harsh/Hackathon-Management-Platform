import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Card} from 'antd';

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#325288 !important',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "15px",
        margin: 5,
        width: "100%",
        textTransform: "none",
        border: "1px solid #325288"
    },
}))(Button);


const useStyles = makeStyles({
    root: {
        width: "25%",
        minHeight: "800px",
        backgroundColor: "#FAEEE7",
        margin: 10
    },
    paper: {
        position: 'absolute',
        width: 300,
        display: "flex",
        flexDirection: "column",

        backgroundColor: "#FAEEE7",
        border: '2px solid #000',
        boxShadow: "#FAEEE7",
        padding: 10,
    },
});

export default function Message({message, type}) {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render

    if (type == "1") {
        return (


            <div className="site-card-border-less-wrapper"  style={{ display: "flex",
                alignSelf: "flex-end",width: 300,  borderRadius: 22, margin: 15}}>
                <Card title="Card title" bordered={false}
                      style={{width: 300, backgroundColor: "green", borderRadius: 22, margin: 15}}>
                    <p>Card content</p>
                </Card>
            </div>

        );
    } else if (type == "2") {
        return (


            <div className="site-card-border-less-wrapper"  style={{
                alignSelf: "flex-start",width: 300, backgroundColor: "yellow", borderRadius: 22, margin: 15}}>
                <Card title="Card title" bordered={false}
                     >
                    <p>Card content</p>
                </Card>
            </div>

        );
    }

}
