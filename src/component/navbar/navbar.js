import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ColorButton from '../button/button'
import {NavLink} from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Drawer from "@material-ui/core/Drawer";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Grid from '@material-ui/core/Grid';
import css from './Navbar.module.css'
import firebase from "../../firebaseConfig/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";


class Navbar extends Component {
    state = {
        AnchorEl: null,
        right: false,
        anchor: false,
        anchorDrawer: false,
        anchorDrawerEl: false,
        AvatarInitails: "",
        isAuth:false,
        logOut:false
    }

    componentDidMount() {
        const auth = getAuth();
        onAuthStateChanged(auth,user => {
            this.setState({ isAuth: !!user })
            console.log("user", !!user)
        })
        // this.props.onTryAutoSignUp();
        // console.log("Printing",this.props.user_type,
        //    );
    }

    handleClose = () => {
        this.setState({AnchorEl: null})
    };

    toggleDrawerClose1 = (event) => {
        this.setState({anchorDrawer: false});
    };

    toggleDrawer1 = (event) => {
        this.setState({anchorDrawer: true});
        // console.log(this.context.priority)
    };
    toggleDrawerClose = (event) => {
        this.setState({anchor: false});
    };

    toggleDrawer = (event) => {
        this.setState({anchor: true});
        // console.log(this.context.priority)
    };


    loggingOutUser = () =>{
        const auth = getAuth();
        auth.signOut()

    }

    render() {

        //https://colorhunt.co/palette/253250W
        // const {classes} = {...this.props};

        const list = (anchor) => (
            <div
                style={{
                    width: 250,
                    background: "#1a508b",
                    height: "100%",
                    color: "#fff3e6",

                }}
                role="presentation"
                onClick={this.toggleDrawer}
                onKeyDown={this.toggleDrawer}
            >
                <Avatar style={{
                    margin: "20px auto",
                    color: "#c1a1d3",
                    background: "#fff3e6",
                    width: "100px",
                    height: "100px",
                    fontSize: "20px"
                }}>{this.props.userType}</Avatar>
                <Divider/>
                <List>


                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >

                        {this.props.isAuth && <ColorButton component={NavLink} to={"/profile"} color="inherit" style={{
                            width: "200px",
                            marginTop:"20%"

                        }}>Profile</ColorButton> }

                        {this.props.isAuth && <ColorButton onClick={()=>this.loggingOutUser()} color="inherit" style={{
                            width: "200px",
                            marginTop:"20%"

                        }}>Logout</ColorButton> }



                    </Grid>


                </List>
            </div>
        );

        return (
            <>
                <AppBar position="static" style={{
                    backgroundColor: "#1a508b"
                }}>
                
                    <Toolbar variant="dense" style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "'Julius Sans One', sans-serif",
                        fontSize: "20px",
                        marginBottom: "-30px",
                        color: "#fff3e6"
                    }}>

                        {this.props.NavbarTitle}

                    </Toolbar>
                    <Toolbar>


                        <span className={css.Menu_Css}>

                        </span>
                        <span className={css.categories_Css}>
                        <ColorButton color="inherit" component={NavLink} to={"/home"}>Challenges</ColorButton>
                        <ColorButton color="inherit" style={{
                            width:200
                        }} component={NavLink} to={"/hackathon/create"}>Organise Hackathon</ColorButton>


                         </span>
                        <div style={{
                            flexGrow: 1
                        }}>

                        </div>
                        {
                            this.props.isAuth ?
                                <>   <div>
                                    {["right"].map((anchor) => (
                                        <React.Fragment key={anchor}>
                                            <ColorButton

                                                style={{
                                                    color:"white"
                                                }}
                                                onClick={this.toggleDrawer1}
                                            >
                                                <AccountBoxIcon style={{
                                                    width:"30px",
                                                    height:"40px"
                                                }}/>
                                            </ColorButton>
                                            <Drawer
                                                anchor={anchor}
                                                open={this.state.anchorDrawer}
                                                onClose={this.toggleDrawerClose1}
                                            >
                                                {list(anchor)}
                                            </Drawer>
                                        </React.Fragment>
                                    ))}


                                </div></> : <><ColorButton  component={NavLink} to={"/authenticate"}  color="inherit"
                                                            style={{
                                                                width: "100px",

                                                            }}>Sign In</ColorButton></>



                        }


                    </Toolbar>
                </AppBar>
                

            </>
        );
    }
}

// const mapStateToProps = state => {
//
//     return {
//         isAuth: state.user.refreshToken !== null,
//         userType: state.user.userType,
//         userId:state.user.userId,
//         emailId:state.user.emailId
//
//     }
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onTryAutoSignUp: () => dispatch(actions.authCheckState()),
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
export default (Navbar);
// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
