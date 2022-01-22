import React, { Component } from 'react';
import ColorButton from '../button/button'
import {NavLink,useParams} from 'react-router-dom';
import Button from "@material-ui/core/Button";

export default function Tabs(props) {
    let { hackathonId } = useParams();

    return (<div className="d-flex justify-content-around">
        <div>
                <Button color="inherit" component={NavLink} to={`/hackathon/overview/${hackathonId}`}>Overview</Button>
                <Button color="inherit" component={NavLink} to={`/hackathon/discussion/${hackathonId}`}>Discussion</Button>
                <Button color="inherit" component={NavLink} to={`/hackathon/discussion/${hackathonId}`}>Notebook</Button>

        </div>
        <div>
        <ColorButton size="small" component={NavLink} to={ props?.user?.email ? `/hackathon/${props.hackathonId}` : `/authenticate`} className="bg-success w-100 ml-auto" style={{
                            borderRadius: '50px',
                        }}
                        >
                        <span className="text-light" style={{
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}>
                        Participate Now
                        </span>
        </ColorButton>
        </div>
        </div>
        );

}
