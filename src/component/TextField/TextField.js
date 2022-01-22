import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: "#fff3e6",
            fontSize: "20px",
            marginTop: "-10px",
            fontFamily: "'Montserrat', sans-serif",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1a508b',

        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1a508b',
                fontSize: "20px",
            },
            '&:hover fieldset': {
                borderColor: '#1a508b',
                color: "#1a508b",
                fontSize: "20px",

                fontFamily: "'Montserrat', sans-serif",
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1a508b',
                color: "white"
            },
        },
        '& .MuiInputBase-input': {
            color: "#fff3e6",
            fontSize: "20px",
            fontFamily: "'Montserrat', sans-serif !important",
        },
        '& .MuiInput-input': {
            color: "#fff3e6",
            fontSize: "20px",
            fontFamily: "'Montserrat', sans-serif",
        },
        '& .MuiFormLabel-root.Mui-disabled': {
            color: "#fff3e6",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "25px",

        },
        '& .MuiInputLabel-root': {
            color: "#fff3e6",
            display: "block",
            transformOrigin: "top left",
        },

    }

})(TextField);

export default CssTextField;
