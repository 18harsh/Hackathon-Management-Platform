import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import {Box, createMuiTheme} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import CssTextField from "../../TextField/TextField";
import {ThemeProvider} from "react-bootstrap";

const validationSchema = yup.object({
    hackathon_name: yup
        .string('Enter your hackathon_name')
        .required('hackathon_name is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    date: yup.date().nullable()
});

const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: {
            main:  "#fff3e6"
        }
    },
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: "#fff3e6",
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                // backgroundColor: lightBlue.A200,
                // color: "white",
            },
        },
        MuiPickersDay: {
            day: {
                color: "#fff3e6",
            },
            daySelected: {
                backgroundColor:"#fff3e6",
            },
            dayDisabled: {
                color: "#fff3e6",
            },
            current: {
                color: "#fff3e6",
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color:"#fff3e6",
            },
        },

    },
});

const CreateHackathon = () => {
    const formik = useFormik({
        initialValues: {
            hackathon_name: '',
            hackathon_website: '',
            hackathon_start_date:'',
            Hackathon_end_date:'',
            hackathon_description:''
        },

        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div style={{
            margin :10,
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <form onSubmit={formik.handleSubmit}>
                <CssTextField
                    fullWidth
                    id="hackathon_name"
                    name="hackathon_name"
                    label="Hackathon Name"
                    style={{
                        margin:10
                    }}
                    value={formik.values.hackathon_name}
                    onChange={formik.handleChange}
                    error={formik.touched.hackathon_name && Boolean(formik.errors.hackathon_name)}
                    helperText={formik.touched.hackathon_name && formik.errors.hackathon_name}
                />
                <CssTextField
                    fullWidth
                    id="hackathon_website"
                    name="hackathon_website"
                    label='Hackathon Website'
                    style={{
                        margin:10
                    }}
                    value={formik.values.hackathon_website}
                    onChange={formik.handleChange}
                    error={formik.touched.hackathon_website && Boolean(formik.errors.hackathon_website)}
                    helperText={formik.touched.hackathon_website && formik.errors.hackathon_website}
                />
                <CssTextField
                    fullWidth
                    id="hackathon_start_date"
                    name="hackathon_start_date"
                    label='hackathon start date'
                    type='datetime-local'
                    style={{
                        margin:10
                    }}
                    value={formik.values.hackathon_start_date}
                    onChange={formik.handleChange}
                    error={formik.touched.hackathon_start_date && Boolean(formik.errors.hackathon_start_date)}
                    helperText={formik.touched.hackathon_start_date && formik.errors.hackathon_start_date}
                />
                <Box width="100%" mb={2}>
                    {/* Material Ui Date Picker */}

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <ThemeProvider theme={defaultMaterialTheme}>
                            <DateTimePicker
                                id="date-picker-dialog"
                                label="Hackathon Start Date"
                                inputVariant="outlined"
                                format="MM/dd/yyyy HH:mm:ss"
                                value={formik.values.date}
                                style={{
                                    margin:10,
                                    color:"white !important"
                                }}
                                onChange={val=>{
                                    formik.setFieldValue("date", val)
                                }}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                            </ThemeProvider>
                        </MuiPickersUtilsProvider>


                </Box>
                {/*<Field name="date" timezone={DefaultTz} component={DateTimeField} />*/}

                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default CreateHackathon;