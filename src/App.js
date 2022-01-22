import React,{Component} from "react";
import Navbar from "./component/navbar/navbar";
import Homepage from './pages/homepage/homepage';
import Hackathon from './pages/hackathon/index';
import Profile from './pages/profile/profile'
import Authenticate from "./pages/authentication/authenticate";
import * as actions from './store/actions/userAuthActions';
import Discussions from "./component/discussion/discussion";
import {connect} from "react-redux";
import { Routes, Route,  } from "react-router-dom";
import CreateHackathon from "./component/hackathon/create_hackathon/create_hackathon";
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <Route path="hackathon" >
              <Route path=":hackathonId" element={<Hackathon/>}/>
              <Route path="overview/:hackathonId" element={<Discussions/>}/>
              <Route path="discussion/:hackathonId" element={<Discussions/>}/>
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
