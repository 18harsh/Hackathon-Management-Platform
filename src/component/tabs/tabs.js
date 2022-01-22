import React, { Component } from 'react';
import ColorButton from '../button/button'
import {NavLink,useParams} from 'react-router-dom';
import Button from "@material-ui/core/Button";

export default function Tabs(props) {
    let { hackathonId } = useParams();

    return (<div>
        <div>
                <Button color="inherit" component={NavLink} to={`/overview/${hackathonId}`}>Overview</Button>
                <Button color="inherit" component={NavLink} to={`/discussion/${hackathonId}`}>Discussion</Button>

        </div>
        </div>
        );

}
