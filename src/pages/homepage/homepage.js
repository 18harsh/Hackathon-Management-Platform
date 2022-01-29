import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {db} from '../../firebaseConfig/firebaseConfig';
import { collection, query,  onSnapshot } from "firebase/firestore";
import HackathonCard from "../../components/hackathonCard/hackathonCard";
import {useEffect} from "react";



export default function Homepage() {

    const [hackData,setHack] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const q = query(collection(db, "hackathons"));
        onSnapshot(q, (querySnapshot) => {
            const hack = [];
            querySnapshot.forEach((doc) => {
                hack.push({hackathons: doc.data(),hackathonId:doc.id});
            });
            setHack(hack);
            setLoading(false)


        });

    },[hackData]);
    if(loading) {
        return <div/>;
    }

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


// const Homepage = () => {
//     const dispatch = useDispatch();
//     const userState = useSelector((state) => state.user);
//     // const { authCheckState } = bindActionCreators(actionCreators, dispatch);
//
//     // handleEditorChange({ html, text }) {
//     //     console.log('handleEditorChange', html, text);
//     // }
//
//     useEffect(()=>{
//         console.log(userState)
//     });
//
//
//
//         return (
//             <div style={{
//
//                 display:"flex",
//                 flexDirection:"row",
//                 flexFlow:"wrap",
//
//             }}>
//
//                     <HackathonCard/>
//                     <HackathonCard/>
//                     <HackathonCard/>
//                     <HackathonCard/>
//                     <HackathonCard/>
//
//                     {/*{*/}
//                     {/*    this.state.hackathons.map((hackathon)=>(*/}
//                     {/*        <div*/}
//                     {/*            style={{*/}
//                     {/*                //    width: '33.3%',*/}
//                     {/*            }}*/}
//                     {/*            className="col-4 mb-3"*/}
//                     {/*        >*/}
//
//                     {/*            <Hackathoncard hackathon={hackathon.hackathons} hackathonId={hackathon.hackathonId} user={this.state.auth}/>*/}
//                     {/*        </div>*/}
//                     {/*    ))*/}
//                     {/*}*/}
//
//
//             </div>
//         );
//
// }
//
//
// export default Homepage;
// export default Homepage;


