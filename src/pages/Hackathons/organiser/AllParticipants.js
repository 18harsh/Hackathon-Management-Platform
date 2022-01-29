import React, {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Table,
    TableBody, TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../../firebaseConfig/firebaseConfig";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {styled} from "@mui/system";
import LinkIcon from '@mui/icons-material/Link';
import Button from "@mui/material/Button";
import {ArrowForwardIosOutlined} from "@mui/icons-material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976d2",
        color: theme.palette.common.white,
        border: "2px solid white",
        borderRadius:5,
        fontSize:18
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



const AccordionC = styled((props) => (
    <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `none`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummaryC = styled((props) => (
    <AccordionSummary
        expandIcon={<ArrowForwardIosOutlined sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetailsC = styled(AccordionDetails)(({ theme }) => ({
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const AllParticipants =()=> {

    let {hackathonId} = useParams();

    const [participants, setParticipants] = React.useState(false);
    const [loading,setLoading] = useState(true);

    useEffect(() => {


            const particpiapntRef = collection(db, "hackathons", hackathonId, "participants");
            const q = query(particpiapntRef);

            onSnapshot(q, async (querySnapshot) => {
                const hack = [];
                querySnapshot.forEach((doc) => {
                    hack.push({hackathons: doc.data(), hackathonId: doc.id});
                });
                setParticipants(hack)
                setLoading(false)
                // console.log(hack);
            });


    }, [hackathonId]);




    if(loading) {
        return <div/>;
    }



    return (
        <div style={{
            margin:15
        }}>
            <div >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700,borderRadius:5 }}>
                        <TableHead style={{
                            backgroundColor:"black"
                        }}>
                            <TableRow> <StyledTableCell>Sr No</StyledTableCell>
                                <StyledTableCell>Participating Teams</StyledTableCell>
                                <StyledTableCell >Team Id</StyledTableCell>
                                <StyledTableCell >Submission</StyledTableCell>
                                <StyledTableCell >Repository Owner</StyledTableCell>
                                <StyledTableCell >Repository Link </StyledTableCell>
                                <StyledTableCell >Repository Stats</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>


                        {participants.map((value,index)=>{
                            return  <>  <TableRow><StyledTableCell align="center" >
                                <Typography style={{
                                    fontSize:18
                                }}>
                                    {index+1}
                                </Typography>

                            </StyledTableCell><AccordionC style={{
                                backgroundColor:"transparent"
                            }}>
                                <AccordionSummaryC
                                    expandIcon={<ExpandCircleDownIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{
                                        backgroundColor:"transparent"
                                    }}
                                >
                                    <Typography>{value.hackathons.hackathon_email_id_creator}</Typography>
                                </AccordionSummaryC>
                                <AccordionDetailsC>
                                    <Table>
                                        <TableBody>
                                            {value.hackathons.participants_emailId.map((row,index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {row}
                                                    </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </AccordionDetailsC>
                            </AccordionC>
                                <StyledTableCell >
                                    {value.hackathonId}
                                </StyledTableCell>
                                <StyledTableCell  align="center">
                                    {value.hackathons.repoOwner === undefined ? "false" :" true"}
                                </StyledTableCell>
                                <StyledTableCell  align="center">
                                    {value.hackathons.repoOwner}
                                </StyledTableCell>
                                <StyledTableCell  align="center">
                                    <a href={value.hackathons.repoWebsite}>
                                        <LinkIcon/>
                                    </a>

                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button style={{
                                        fontWeight:"bold",
                                        color: "#1976d2",
                                        border: "1px solid #1976d2",
                                        marginBottom:5
                                    }}>Check Git Stats</Button>
                                </StyledTableCell>
                            </TableRow>
                            </>
                        })}


                        </TableBody>



                    </Table>
                </TableContainer>

            </div>

        </div>
    );

}


export default AllParticipants;
// export default Homepage;


