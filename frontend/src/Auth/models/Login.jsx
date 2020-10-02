import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { authenticate, requestFail } from "./../actions";

export default () => {
    const title = "Sign In";
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const authState = useSelector(state => state.auth);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Page: ${title}`;

        if(authState.token !== "") {
            //setRedirect(true);
        }

        dispatch(requestFail(null));
    },[]);

    return ( redirect === true ? <Redirect to="/user-list" /> :
        <CONTAINER>
            <h1>Simple CRM - {title}</h1>
            <Error>{authState.error}</Error>
            <Formik 
                initialValues={{ email:"", password:"" }}
                // Hooks up our validationSchema to Formik 
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    setSubmitting(true);
                    
                    dispatch(authenticate(values, setRedirect))
                    // Sets setSubmitting to false after form is reset
                    setSubmitting(false);
                }}
                validationSchema={validationSchema}
                >
                    {/* Callback function containing Formik state and helpers that handle common form actions */}
                {( {values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting 
                }) => (
                <MYFORM onSubmit={handleSubmit} className="mx-auto">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className={touched.email && errors.email ? "error" : null}
                        />
                        {touched.email && errors.email ? (
                                <Error>{errors.email}</Error>
                            ): null}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className={touched.password && errors.password ? "error" : null}
                        />
                        {touched.password && errors.password ? (
                                <Error>{errors.password}</Error>
                            ): null}
                    </Form.Group>

                    <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
                        Sign In
                    </BUTTON>
                    <ButtonLink variant="primary" to="/signup-admin">
                        Sign Up Admin
                    </ButtonLink>
                </MYFORM>
            )}
            </Formik>
        </CONTAINER>
    );
}

// Schema for yup
const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
    password: Yup.string()
    .min(6, "*Password must have at least 6 characters")
    .max(100, "*Password can't be longer than 100 characters")
    .required("*Password is required"),
  });

// Styled-components styles
const CONTAINER = styled.div`
  background: #F7F9FA;
  height: auto;
  width: 40%;
  margin: 5em auto;
  padding: 25px;
  color: snow;
  border: 2px solid #e5e5e5;

  @media(min-width: 786px) {
    width: 35%;
  }

  label {
    color: #24B9B6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24B9B6;
    padding-top: .5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }
`;

const MYFORM = styled(FormikForm)`
    width: 100%;
    text-align: left;
    padding-top: 2em;
    padding-bottom: 2em;

    @media(min-width: 786px) {
        width: 100%;
    }
`;

const BUTTON = styled(Button)`
    background: #1863AB;
    border: none;
    font-size: 1.2em;
    font-weight: 400;
    float: right;
    &:hover {
        background: #1D3461;
    }
`;

const ButtonLink = styled(Link)`
    background: #1863AB;
    border: none;
    font-size: 1.2em;
    font-weight: 400;
    float: left;
    color: #fff;
    padding: 7px 10px;
    border-radius: 5px;
    &:hover {
        background: #1D3461;
        text-decoration: none;
        color: #fff;
    }
`;

const Error = styled.div`
    color: #FF6565;
    padding: .5em .2em;
    height: 1em;
    position: absolute;
    font-size: .8em;
`;