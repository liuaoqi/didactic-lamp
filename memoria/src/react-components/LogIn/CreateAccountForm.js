import {containedDarkPurpleButton} from "./styles"
import { Formik, Form } from 'formik'
import React from 'react'
import { Button, TextField, MenuItem} from "@material-ui/core"
import './styles.css'
import * as Yup from 'yup'

const createAccountSchema = Yup.object().shape({
    newEmail: Yup.string().required('email is required').email('a vaild email is required'),
    newUsername: Yup.string().required('username is required'),
    newPassword: Yup.string().required('password is required').min(4, 'password needs to be at least 4 characters'),
    newName: Yup.string().required('name is required'),
    newRegion: Yup.mixed().required('region is required')
  });

const initialValues = {
    newEmail: "",
    newUsername: "",
    newPassword: "",
    newName: "",
    newRegion: "",
    }

const CreateAccountForm = (props) => (
    <Formik initialValues={initialValues} 
        onSubmit={(values, {resetForm}) => {
            props.onSubmit(values);
            resetForm({values: initialValues})
            }}
        validationSchema={createAccountSchema}
        >
    {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched
      }) => { return (
          <Form onSubmit={handleSubmit}>
            <div className="formContainer">
                <label className="labelContainer">Email<br /></label>
                <TextField 
                    variant="filled"
                    className="registrationField" 
                    type="email" 
                    name="newEmail" 
                    placeholder="Enter valid email address" 
                    value={values.newEmail} 
                    onChange={(e) => {handleChange(e)}}
                    onBlur={(e) => handleBlur(e)}
                    helperText={errors.newEmail && touched.newEmail ? errors.newEmail : ""}
                    error={errors.newEmail && touched.newEmail}
                    size='small'
                />

                <label className="labelContainer"><br />Username<br /></label>
                <TextField
                    variant="filled"
                    className="registrationField" 
                    name="newUsername" 
                    placeholder="Enter valid username" 
                    value={values.newUsername} 
                    onChange={(e) => {handleChange(e)}}
                    onBlur={(e) => handleBlur(e)}
                    helperText={errors.newUsername && touched.newUsername ? errors.newUsername : ""}
                    error={errors.newUsername && touched.newUsername}
                    size='small'
                    />

                <label className="labelContainer"><br />Password<br /></label>
                <TextField 
                    variant="filled"
                    className="registrationField" 
                    value={values.newPassword} 
                    placeholder="Enter valid password" 
                    name="newPassword" 
                    type="password"
                    onChange={(e) => {handleChange(e)}}
                    onBlur={(e) => handleBlur(e)}
                    helperText={errors.newPassword && touched.newPassword ? errors.newPassword : ""}
                    error={errors.newPassword && touched.newPassword}
                    size='small'
                    />

                <label className="labelContainer"><br />Name<br /></label>
                <TextField 
                    variant="filled"
                    className="registrationField" 
                    value={values.newName} 
                    placeholder="Enter name" 
                    name="newName"
                    onChange={(e) => {handleChange(e)}}
                    onBlur={(e) => handleBlur(e)}
                    helperText={errors.newName && touched.newName ? errors.newName : ""}
                    error={errors.newName && touched.newName}
                    size='small'
                    />

                <label className="labelContainer"><br />Region<br /></label>
                <TextField
                    variant="filled"
                    className="selectField"
                    name="newRegion" 
                    value={values.newRegion}
                    select
                    onChange={(e) => {handleChange(e)}}
                    onBlur={(e) => handleBlur(e)}
                    helperText={errors.newRegion && touched.newRegion ? errors.newRegion : ""}
                    error={errors.newRegion && touched.newRegion }
                    size='small'
                     >
                    <MenuItem value=""> -- select your region -- </MenuItem>
                    <MenuItem value="Ajax">Ajax</MenuItem>
                    <MenuItem value="Aurora">Aurora</MenuItem>
                    <MenuItem value="Brampton">Brampton</MenuItem>
                    <MenuItem value="Brock">Brock</MenuItem>
                    <MenuItem value="Burlington">Burlington</MenuItem>
                    <MenuItem value="Caledon">Caledon</MenuItem>
                    <MenuItem value="Clarington">Clarington</MenuItem>
                    <MenuItem value="EastGwillimbury">East Gwillimbury</MenuItem>
                    <MenuItem value="Georgina">Georgina</MenuItem>
                    <MenuItem value="HaltonHills">Halton Hills</MenuItem>
                    <MenuItem value="King">King</MenuItem>
                    <MenuItem value="Markham">Markham</MenuItem>
                    <MenuItem value="Milton">Milton</MenuItem>
                    <MenuItem value="Mississauga">Mississauga</MenuItem>
                    <MenuItem value="Newmarket">Newmarket</MenuItem>
                    <MenuItem value="Oakville">Oakville</MenuItem>
                    <MenuItem value="Oshawa">Oshawa</MenuItem>
                    <MenuItem value="Pickering">Pickering</MenuItem>
                    <MenuItem value="RichmondHill">Richmond Hill</MenuItem>
                    <MenuItem value="Scugog">Scugog</MenuItem>
                    <MenuItem value="Toronto">Toronto</MenuItem>
                    <MenuItem value="Uxbridge">Uxbridge</MenuItem>
                    <MenuItem value="Vaughan">Vaughan</MenuItem>
                    <MenuItem value="Whitby">Whitby</MenuItem>
                    <MenuItem value="Whitchurch-Stouffville">Whitchurch-Stouffville</MenuItem>
                </TextField><br/>
                <Button type="submit" variant="contained" style={containedDarkPurpleButton}>Create</Button>
            </div>
        </Form>
      )}
      }
    </Formik>
)

export default CreateAccountForm