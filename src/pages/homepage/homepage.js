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
import {db} from '../../firebaseConfig/firebaseConfig';
import { collection, query, where, onSnapshot } from "firebase/firestore";
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


const card = ["","","","","","","","","","",""]

class Homepage extends Component {
    state = {
        loading:false,
        hackathons:[]
    }

    handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
    }


    componentDidMount() {
        const auth = getAuth();
        onAuthStateChanged(auth,user => {

            this.setState({
                isAuth: !!user,
            })


        })
        const q = query(collection(db, "hackathons"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const hack = [];
            querySnapshot.forEach((doc) => {
                hack.push(doc.data());
            });
            this.setState({
                hackathons:hack
            })
            console.log("Current cities in CA: ", hack);
        });
        this.props.onTryAutoSignUp()
        console.log(auth.currentUser)
    }


    render() {
        return (
            <div className="m-5">
            <div className={`${css.homepage} row justify-content-left`}>
                
                {
                    this.state.hackathons.map((hackathon)=>(
                        <div 
                        style={{
                        //    width: '33.3%',
                        }}
                        className="col-4 mb-3"
                        >

                        <Hackathoncard/>
                        </div>
                    ))
                }
            </div>
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


