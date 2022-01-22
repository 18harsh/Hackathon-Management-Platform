import React,{Component} from "react";
import * as actions from "../../store/actions/userAuthActions";
import {connect} from "react-redux";


import 'react-markdown-editor-lite/lib/index.css';
import {getAuth,  onAuthStateChanged} from "firebase/auth";

import LeftPanel from "./left_panel/left_panel";
import RightPanel from "./chat_area/chat_area";

class Discussions extends Component {

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
                alignItems:"stretch",
                flexDirection:"row",
                height:"100%",
                width:"100%"
            }}>
               <LeftPanel></LeftPanel>
                <RightPanel/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Discussions);
// export default Homepage;

// <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
