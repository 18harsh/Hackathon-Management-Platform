import React,{Component} from "react";
import * as actions from "../../store/actions/userAuthActions";
import {connect} from "react-redux";
import css from './homepage.module.css'
import {getAuth,  onAuthStateChanged} from "firebase/auth";
import Tabs from "../../component/tabs/tabs";
import {Outlet} from 'react-router-dom';

class Hackathon extends Component {
    

    handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
    }


    componentDidMount() {
        const auth = getAuth();
        // onAuthStateChanged(auth,user => {
        //
        //     this.setState({
        //         isAuth: !!user,
        //     })
        //
        // })
        this.props.onTryAutoSignUp()
        console.log(auth.currentUser)
    }
    

    render() {
        return (
            <div style={{
                display:"flex",
                flexDirection:"column"
            }}>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center"
                }}>
               <Tabs/>
                </div>
                <Outlet/>
               </div>

            
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

export default connect(mapStateToProps, mapDispatchToProps)(Hackathon);
// export default Homepage;


