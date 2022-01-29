
import './App.css';
import Navbar from "./components/navbar/navbar";
import * as React from "react";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from "./redux/index";
import SnackBarComponent from "./components/snackbar/snackbar";
import { Routes, Route,  } from "react-router-dom";
import Homepage from "./pages/Homepage/homepage";
import Profile from "./pages/Profile/profile";
import {ThemeProvider} from "@mui/material";
import theme from './theme/theme';
import HackathonCreate from "./pages/Hackathons/create/hackathonCreate";
import Hackathon from "./pages/Hackathons/hackathon";
import HackathonOverview from "./pages/Hackathons/overview/overview";
import {useCallback, useEffect} from "react";
import Discussion from "./pages/Hackathons/discussion/discussion";
import Submission from "./pages/Hackathons/submission/submission";
import Participants from "./pages/Hackathons/participants/participants";
import UserOrganisedHackathons from "./pages/Hackathons/user_organised_hackathons/user_organised_hackathons";
import AllParticipants from "./pages/Hackathons/organiser/AllParticipants";
import {getAuth, onAuthStateChanged} from "firebase/auth";


function App() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const { authSuccess,logout } = bindActionCreators(actionCreators, dispatch);

    const snackBarState = useSelector((state) => state.snackBar);

    const fetchBusinesses = useCallback(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {

            if (user === null || user === 'undefined') {
                logout()
            } else {

                const refreshToken = user.refreshToken;
                const userId = user.uid;
                const emailId = user.email;
                const displayName = user.displayName;
                const photoUrl = user.photoURL;


                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                if (expirationDate <= Date()) {

                    logout()

                } else {
                    authSuccess(refreshToken, displayName, userId, emailId, photoUrl)

                    // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
                }
            }
            // console.log("user", user)


        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=> {
        fetchBusinesses()
    } ,[fetchBusinesses])



  return (
      <ThemeProvider theme={theme}>
      <div>
        {snackBarState.status ? <SnackBarComponent  status={snackBarState.status} msg={snackBarState.message} /> : null}

      <Navbar/>
        {/*<Button onClick={()=>snackBarShow(true,'success','Successfully Redux')} variant="outlined">Outlined</Button>*/}
          <Routes>
              {/*<Redirect from="/" to="/home" exact/>*/}
              <Route  path="/" element={
                  <Homepage/>
              }/>
              <Route index  path="home" element={
                  <Homepage/>
              }/>
              {/*<Route path="authenticate" element={<Authenticate/>}/>*/}
              {userState.refreshToken !== null ? <Route path="profile" element={<Profile/>}/>:null }
              {userState.refreshToken !== null ? <Route path="hackathons/create" element={<HackathonCreate/>}/> :null}
              <Route path="hackathons/organised" element={<UserOrganisedHackathons/>}/>
              {/*<Route path="hackathons/" element={<OrganizerPage/>}/>*/}
              <Route path="hackathon" >
                  <Route path=":hackathonId" element={<Hackathon/>}/>
                  <Route path="overview/:hackathonId" element={<HackathonOverview/>}/>
                  <Route path="discussion/:hackathonId" element={<Discussion/>}/>
                  <Route path="submission/:hackathonId" element={<Submission/>}/>
                  <Route path="participants/:hackathonId" element={<AllParticipants/>}/>
                  <Route path="participant/:hackathonId" element={<Participants/>}/>
                  {/*<Route path="participants/:hackathonId" element={<OrganizerPage/>}/>*/}
              {/*    <Route path="github/:hackathonId/:teamId" element={<Github_data/>}/>*/}
              </Route>

              {/*<Route path="hackathon/create" element={<CreateHackathon/>}/>*/}
          </Routes>
      </div>
      </ThemeProvider>
  );
}

export default App;
