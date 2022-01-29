import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import { bindActionCreators } from 'redux'
import { snackBarActions} from "../../redux";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = () => {

    const snackBarState = useSelector((state) => state.snackBar);

    const dispatch = useDispatch();
    const { snackBarHide } = bindActionCreators(snackBarActions, dispatch);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            snackBarHide()
            return;
        }
        snackBarHide();

    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={snackBarState.status} autoHideDuration={1000}  anchorOrigin={{  vertical: 'top',
                horizontal: 'right',}} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackBarState.typeOfMessage} sx={{ width: '100%' }}>
                    {snackBarState.message}
                </Alert>
            </Snackbar>
            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>*/}
            {/*<Alert severity="info">This is an information message!</Alert>*/}
            {/*<Alert severity="success">This is a success message!</Alert>*/}
        </Stack>
    );
}

export default SnackbarComponent;