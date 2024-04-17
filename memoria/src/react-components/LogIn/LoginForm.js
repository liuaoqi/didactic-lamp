import {containedLightPurpleButton} from "./styles"
import { Formik, Form } from 'formik'
import React from 'react'
import { Button, TextField } from "@material-ui/core"
import './styles.css'
import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  username: Yup.string().required('username is required'),
  password: Yup.string().required('password is required'),
});


const LoginForm = (props) => (
    <Formik initialValues={{username: '', password: ''}} onSubmit={(values) => {props.onSubmit(values)}} validationSchema={loginSchema}>
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
                <label className="labelContainer">Username<br/></label>
                <TextField 
                  className="loginField" 
                  size="small"
                  variant="filled"
                  name='username' 
                  value={values.username} 
                  placeholder="Enter your username" 
                  onChange={(e) => {handleChange(e)}}
                  onBlur={(e) => handleBlur(e)} 
                  helperText={errors.username && touched.username ? errors.username : ""}
                  error={errors.username && touched.username}
                />
                <label className="labelContainer"><br/>Password<br/></label>
                <TextField
                  className="loginField" 
                  size="small"
                  variant="filled"
                  name="password" 
                  type="password" 
                  value={values.password} 
                  placeholder="Enter your password" 
                  onChange={(e) => {handleChange(e)}}
                  onBlur={(e) => handleBlur(e)}
                  helperText={errors.password && touched.password ? errors.password : ""}
                  error={errors.password && touched.password}

                />
            </div> <br/>
            <Button variant="contained" type="submit" style={containedLightPurpleButton}>Login</Button>
          </Form>
      )}
      }
    </Formik>
)

export default LoginForm