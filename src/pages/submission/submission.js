import React from 'react';

import {makeStyles} from "@material-ui/core/styles";
import Tabs from '../../component/tabs/tabs';

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


    return (<div className="">
            < Tabs/>
            

        </div>
    );

}
