import {Formik, Form, Field} from 'formik'
import {Button, Typography} from '@material-ui/core'
import React from 'react'
import {submitButton, questionTitleStyle} from './styles'
import './styles.css'

const initialValues = {
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: ''
  };
  
  const SurveyForm = (props) => (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        props.onSubmit(values);
      }}>
      {({
        handleChange,
        handleSubmit,
        values,
      }) => {
        return (
            <Form onSubmit={handleSubmit}>
                <div className='surveyFormContainer'>
                    <div className='questionContainer'>
                        <Typography style={questionTitleStyle}>
                        1. During the 24 hours how often has your mental 
                        health interfered with your ability to accomplish tasks?
                        </Typography>
                        <Field name='q1' as='select' value={values.q1}>
                            <option value="">Select</option>
                            <option value="0">None</option>
                            <option value="1">Once or twice</option>
                            <option value="2">Often</option>
                        </Field>
                    </div>
                    <div className='questionContainer'>
                        <Typography style={questionTitleStyle}>2. Have you felt low or down in the past 24 hours?</Typography>
                        <Field name='q2' as='select' value={values.q2}>
                            <option value="">Select</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Field>
                    </div>
                    <div className='questionContainer'>
                        <Typography style={questionTitleStyle}>3. Are you currently experiencing stress and anxiety due to the pandemic?</Typography>
                        <Field name='q3' as='select' value={values.q3}>
                            <option value="">Select</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Field>
                    </div>
                    <div className='questionContainer'>
                        <Typography style={questionTitleStyle}>4. Are you currently positive for COVID-19?</Typography>
                        <Field name='q4' as='select' value={values.q4}>
                            <option value="">Select</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Field>
                    </div>
                    <div className='questionContainer'>
                        <Typography style={questionTitleStyle}>5. Have you ever been tested positive for COVID-19?</Typography>
                        <Field name='q5' as='select' value={values.q5}>
                            <option value="">Select</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Field>
                    </div>
                    <div className='questionContainer'>
                    <Typography style={questionTitleStyle}>6. From a scale of 1 to 10 what is your mental well-being rating today?</Typography>
                    <Field name='q6' as='select' value={values.q6} onChange={e => handleChange(e)}>
                        <option value="">Select</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </Field>
                    </div>
                </div>
                <div className='buttonContainer'>
                    <Button style={submitButton} variant='text' type='submit'>Submit Survey</Button>
                </div>
            </Form>
        );
      }}
    </Formik>
  );

  export default SurveyForm