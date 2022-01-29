import {styled} from "@mui/system";
import {TextField} from "@mui/material";

const FormTextField = styled(TextField)({
    '& .MuiInputLabel-root': {
        color: '#1976d2',
    },
    '& .MuiIconButton-root': {
        color: '#1976d2',

    },
    '& label.Mui-focused': {
        color: '#1976d2',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#1976d2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#1976d2',
        },
        '&:hover fieldset': {
            borderColor: '#1976d2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
        },
        '&.Mui-focused input': {
            color: '#1976d2',
        },
    },
});

export default FormTextField;