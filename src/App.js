import React,{Component} from "react";
import Navbar from "./component/navbar/navbar";
import Homepage from './pages/homepage/homepage';
import Hackathon from './pages/hackathon/index';
import Profile from './pages/profile/profile'
import Authenticate from "./pages/authentication/authenticate";
import * as actions from './store/actions/userAuthActions';
import Discussion from "./component/discussion/discussion";
import {connect} from "react-redux";
import { Routes, Route,  } from "react-router-dom";
import CreateHackathon from "./component/hackathon/create_hackathon/create_hackathon";
import 'bootstrap/dist/css/bootstrap.min.css';
import HackathonOverview from "./pages/hackathon_overview/hackathon_overview";
import Submission from "./pages/submission/submission";
import User_organised_hackathons from "./pages/user_organised_hackathons/user_organised_hackathons";
import OrganizerPage from "./pages/organizer_page/organizer_page";
import Github_data from "./component/github/github_data";

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  

  render() {
    return (

        <React.Fragment>
          <Navbar {...this.props} NavbarTitle={"HackDev"}/>
          <Routes>
            {/*<Redirect from="/" to="/home" exact/>*/}
            <Route  path="/" element={
              <Homepage/>
            }/>
            <Route index  path="home" element={
              <Homepage/>
            }/>
            <Route path="authenticate" element={<Authenticate/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="hackathons/organised" element={<User_organised_hackathons/>}/>
            <Route path="hackathons/" element={<OrganizerPage/>}/>
            <Route path="hackathon" >
              <Route path=":hackathonId" element={<Hackathon/>}/>
              <Route path="overview/:hackathonId" element={<HackathonOverview/>}/>
              <Route path="discussion/:hackathonId" element={<Discussion/>}/>
              <Route path="submission/:hackathonId" element={<Submission/>}/>
              <Route path="participants/:hackathonId" element={<OrganizerPage/>}/>
              <Route path="github/:hackathonId/:teamId" element={<Github_data/>}/>
            </Route>

            <Route path="hackathon/create" element={<CreateHackathon/>}/>
          </Routes>
        </React.Fragment>

    );
  }

}

const mapStateToProps = state => {

  return {
    isAuth: state.user.refreshToken !== null,
    userType: state.user.userType,
    userId:state.user.userId,
    emailId:state.user.emailId

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
