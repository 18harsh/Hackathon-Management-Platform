import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import DefaultImage from './card_default.jpg'
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector} from "react-redux";

export default function HackathonCard(props) {


    const userState = useSelector((state) => state.user);





    return (
        <Card sx={{ width: 340,height:400,backgroundColor:"#0a1929",marginLeft:10,marginTop:10,borderRadius:4 ,border:"1px solid #1976d2"}}>

            <CardMedia
                component="img"
                height="133"
                image={DefaultImage}
                alt="Paella dish"
            />
            <CardContent>
                <a  href={userState.emailId ? `/hackathon/overview/${props.hackathon.hackathonId}` : `/authenticate`} style={{
                    textDecoration:'none'
                }}>
                    <Typography
                                noWrap

                                sx={{ mr: 2,fontSize:"25px",color:"white", display: { xs: 'none', md: 'flex' } }}   >

                        {props.hackathon.hackathons.hackName}
                    </Typography>
                </a>
                <div style={{
                    height:13
                }}>

                </div>
                <Typography  sx={{ mr: 2,fontSize:"18px",color:"#1976d2", display: { xs: 'none', md: 'flex' } }}  >
                    Starts
                </Typography>
                <Typography sx={{ mr: 2,color:"white",fontSize:"18px", display: { xs: 'none', md: 'flex' } }}  >
                    {props.hackathon.hackathons.hackStart.toDate().toDateString()}
                </Typography>
                <div style={{
                    height:13
                }}>

                </div>
                <Typography  sx={{ mr: 2,fontSize:"18px",color:"#1976d2", display: { xs: 'none', md: 'flex' } }}  >
                    Ends
                </Typography>
                <Typography  sx={{fontSize:"18px", mr: 2,color:"white", display: { xs: 'none', md: 'flex' } }}  >
                    {props.hackathon.hackathons.hackEnd.toDate().toDateString()}
                </Typography>
            </CardContent>

            <CardActions>

                {
                    (props.hackathon.hackathons.organiser_email_id.includes(userState.emailId)) || (props?.hackathon?.hackathons.organiser_email_id === userState.emailId)  ?
                        <>
                            <Button size="small"  component={NavLink} to={ userState.emailId ? `/hackathon/participants/${props.hackathon?.hackathonId}` : `/authenticate`} className="bg-success w-75 mx-auto" style={{
                                borderRadius: '11px',width:"100%",
                                color:"white",
                                backgroundColor:"#1976d2",
                                border:"2px solid #1976d2"
                            }}>
                         <Typography variant="h6" component="h2" sx={{ color:"white" }}  >
                        You are Host
                         </Typography>
                            </Button>
                        </>:<>
                            <Button size="small" component={NavLink} to={ userState.emailId ? `/hackathon/overview/${props.hackathon?.hackathonId}` : `/authenticate`} className="bg-success w-75 mx-auto" style={{
                                borderRadius: '11px',width:"100%",
                                color:"white",
                                backgroundColor:"#1976d2",
                                border:"2px solid #1976d2"
                            }}
                            >
                                <Typography variant="h6" component="h2" sx={{ color:"white"}}  >

                        Participate Now
                                </Typography>
                            </Button>
                        </>

                }


            </CardActions>

        </Card>
    );
}
