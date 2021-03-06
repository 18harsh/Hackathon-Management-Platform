import React,{Component} from "react";
import * as actions from "../../store/actions/userAuthActions";
import {connect} from "react-redux";
import 'react-markdown-editor-lite/lib/index.css';
import {getAuth,  onAuthStateChanged} from "firebase/auth";



class Boilerplate extends Component {

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
            <div >
                <h1>Discussion</h1>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Boilerplate);
// export default Homepage;


