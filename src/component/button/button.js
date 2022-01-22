import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#fff3e6 !important',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "15px",
        marginTop:"10px",
        marginRight:"10px",
        width:"90px",
        textTransform:"none",
    },
}))(Button);

export default ColorButton;
