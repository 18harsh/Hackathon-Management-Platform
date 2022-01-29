import React, {useEffect, useState} from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import HackathonCard from "../../../components/hackathonCard/hackathonCard";
import {db} from "../../../firebaseConfig/firebaseConfig";
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";



const User_organised_hackathons =()=> {

    const userState = useSelector((state) => state.user);
    const [hackData,setHack] = useState([]);

    useEffect(() => {

        if(userState.userId!==null) {
            const q = query(collection(db, "users", userState.userId, "hackathons_organised"));
            onSnapshot(q, (querySnapshot) => {
                const ids = [];
                querySnapshot.forEach((doc) => {
                    ids.push(doc.data().hack_uid);
                });
                console.log(ids)

                if (ids.length!==0) {
                    const q = query(collection(db, "hackathons"),where("hackathon_id", "in",ids ));
                    onSnapshot(q, (querySnapshot) => {
                        const hack = [];
                        querySnapshot.forEach((doc) => {
                            hack.push({hackathons: doc.data(),hackathonId:doc.id});
                        });
                        setHack(hack);
                        console.log(hack)



                    });
                }



            });
        }




    }, [userState.userId]);



    


        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container direction="row"
                      justifyContent="center"
                      alignItems="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, }} sx={{
                    mb:5
                }}>
                    {hackData.map((value, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <HackathonCard hackathon={value}/>
                        </Grid>
                    ))}

                </Grid>

            </Box>
        );

}


export default User_organised_hackathons;
// export default Homepage;


