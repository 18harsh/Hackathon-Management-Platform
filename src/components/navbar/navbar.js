import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch, useSelector} from "react-redux";
import GitHubIcon from '@mui/icons-material/GitHub';
import {bindActionCreators} from 'redux';
import {actionCreators, snackBarActions} from "../../redux";
import {getAuth, GithubAuthProvider, setPersistence, browserSessionPersistence, signInWithPopup} from "firebase/auth";
import {db} from "../../firebaseConfig/firebaseConfig";
import {doc, setDoc} from "firebase/firestore";
import {NavLink} from "react-router-dom";


const Navbar = () => {

    const state = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const {userAuthentication, logout} = bindActionCreators(actionCreators, dispatch);
    const {snackBarShow} = bindActionCreators(snackBarActions, dispatch);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const setUserData = async (email, displayName, githubId, uid) => {


        await setDoc(doc(db, "users", uid), {
            "displayName": displayName,
            "userUid": uid,
            "githubId": githubId,
            "emailId": email
        });

    }

    const signInWithGithub = () => {
        const auth = getAuth();
        const provider = new GithubAuthProvider();

        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return signInWithPopup(auth, provider)
                    .then((result) => {
                        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                        const credential = GithubAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;

                        // The signed-in user info.
                        const user = result.user;
                        console.log(user)
                        setUserData(user.email, user.displayName, user.reloadUserInfo.screenName, user.uid)
                        userAuthentication(user.email, user.displayName, token, user.uid, user.photoURL)
                        snackBarShow(true, 'success', 'Login Successfully')

                        // ...
                    }).catch((error) => {
                        snackBarShow(true, 'success', error.message)
                        // Handle Errors here.
                        // const errorCode = error.code;
                        // const errorMessage = error.message;
                        // // The email of the user's account used.
                        // const email = error.email;
                        // // The AuthCredential type that was used.
                        // const credential = GithubAuthProvider.credentialFromError(error);
                        // ...
                    });
            })
            .catch((error) => {
                // Handle Errors here.

                const errorMessage = error.message;
                snackBarShow(true,'error',errorMessage)
            });

    }


    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,

        }}>


            <AppBar position="static" style={{width: "80%", borderRadius: 10}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                        >
                            Hack Dev
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>

                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >

                                    <MenuItem  onClick={handleCloseNavMenu}>
                                        <Button

                                            component={NavLink} to={"/home"}
                                            sx={{  display: 'block'}}
                                        >
                                            Home
                                        </Button>
                                        {state.refreshToken === null ? <span/>:   <Button

                                            component={NavLink} to={"/hackathons/create"}
                                            sx={{ display: 'block'}}
                                        >
                                            Organize Hackathon
                                        </Button> }
                                    </MenuItem>
                            </Menu>
                        </Box>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

                            <Button

                                component={NavLink} to={"/home"}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Home
                            </Button>

                            {state.refreshToken === null ? <span/>: <Button

                                component={NavLink} to={"/hackathons/create"}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Organize Hackathon
                            </Button>}
                        </Box>

                        <Box sx={{display: "flex", flexGrow: 0, flexDirection: "row"}}>

                            {state.refreshToken !== null ? <span/> : <Button style={{

                                color: "white",
                                border: "1px solid white"
                            }} onClick={() => {
                                signInWithGithub()
                            }} variant="outlined" startIcon={<GitHubIcon sx={{mb: 0.2}}/>}>
                                <Typography
                                    variant="subtitle1"
                                    noWrap
                                    component="div"
                                    sx={{display: {xs: 'none', md: 'flex'}}}
                                > Sign In </Typography>
                            </Button>}
                            {state.refreshToken !== null ? <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src={state.photoURL}/>
                                </IconButton>
                            </Tooltip> : <span/>}
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                style={{}}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >


                                {state.refreshToken !== null ?
                                    <div style={{margin: 10, display: "flex", flexDirection: "column",}}><Button
                                        component={NavLink} to={"/profile"} style={{
                                        fontWeight:"bold",
                                        color: "#1976d2",
                                        border: "1px solid #1976d2",
                                        marginBottom:5
                                    }}>Profile</Button>
                                        <Button style={{

                                            color: "#1976d2",
                                            border: "1px solid #1976d2",
                                            marginBottom:5,
                                            fontWeight:"bold",
                                        }}  component={NavLink} to={"/hackathons/organised"}>Hackathons <br/> Organised</Button>
                                        <Button  style={{
                                            fontWeight:"bold",
                                            color: "#1976d2",
                                            border: "1px solid #1976d2",
                                            marginBottom:5
                                        }} onClick={() => {
                                        logout();

                                    }}>Log Out</Button></div> : <span/>

                                }
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};
export default Navbar;
