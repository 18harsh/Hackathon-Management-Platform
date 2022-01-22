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



class User_organised_hackathons extends Component {
    state = {
        loading:false,
        hackathons:[],
        auth: null,

    }

    handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
    }


    componentDidMount() {
        const auth = getAuth();
        onAuthStateChanged(auth,user => {

            this.setState({
                isAuth: !!user,
                auth: user
            })


        })
        const q = query(collection(db, "hackathons"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const hack = [];
            querySnapshot.forEach((doc) => {
                hack.push({hackathons: doc.data(),hackathonId:doc.id});
            });

            let temp = [];
            for(let i=0;i<hack.length;i++){
                if(hack[i].hackathons.organiser_email_id == this.state?.auth?.email )
                    temp.push(hack[i]);
            }
            
            this.setState({
                hackathons:temp 
            })

        });
        this.props.onTryAutoSignUp()
        console.log(auth.currentUser)
    }

    

    render() {
        return (
            <div className="m-5">
            <div className={`${css.homepage} row justify-content-left`}>
                
                {
                    
                    this.state.hackathons.map((hackathon)=>{
                        
                        if(hackathon.hackathons.organiser_email_id == this.state?.auth?.email )
                        return (
                        
                        <div 
                        style={{
                        //    width: '33.3%',
                        }}
                        className="col-4 mb-3"
                        >

                        <Hackathoncard hackathon={hackathon.hackathons} hackathonId={hackathon.hackathonId} user={this.state.auth}/>
                        </div>
                    )
            })
                }

                {
                    this.state.hackathons.length==0 && <div>
                        <h4>
                        You haven't organized any hackathon yet!
                        </h4>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(User_organised_hackathons);
// export default Homepage;


