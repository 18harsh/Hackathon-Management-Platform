import React,{Component} from "react";
import * as actions from "../../store/actions/userAuthActions";
import {connect} from "react-redux";
import css from './homepage.module.css'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import {getAuth,  onAuthStateChanged} from "firebase/auth";
import Hackathoncard from "../../component/hackathoncard/hackathoncard";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class Homepage extends Component {

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
            <div className={css.homepage}>
                <Hackathoncard/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
// export default Homepage;


