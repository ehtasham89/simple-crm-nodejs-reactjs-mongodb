import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { getUserList, deleteUser, setCurrentUser } from "./../actions";

export default () => {
    const title = `User List`;
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const authUserState = useSelector(state => state.auth.user);
    const userState = useSelector(state => state.user);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Page: ${title}`;
        
        dispatch(getUserList(authUserState._id));
    },[]);

    return ( redirect ? <Redirect to="/signup-staff" /> :
            <CONTAINER>
                <h4>Simple CRM - {title} <Link style={{background: '#e6e6e6', float: 'right', fontSize: '18px', color: 'rgba(0,0,0,0.5)'}} to="/signup-staff">[ Add New Staff User ]</Link></h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userState.list && userState.list.map((row, index) => (
                            <tr key={'row_'+index}>
                                <td>{(index+1)}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td width="20%">
                                    <Button onClick={e => dispatch(setCurrentUser(row, setRedirect))} style={{margin: '0 10px'}}>Edit</Button>
                                    <Button onClick={e => dispatch(deleteUser(row._id, authUserState._id))}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CONTAINER>
    );
}

// Styled-components styles
const CONTAINER = styled.div`
  background: #F7F9FA;
  height: auto;
  width: 80%;
  margin: 1em auto;
  padding: 10px 25px 25px;
  color: snow;
  border: 1px solid #e9e9e9;

  @media(min-width: 786px) {
    width: 75%;
  }

  label {
    color: #24B9B6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h4 {
    color: #24B9B6;
    padding-top: .5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }
`;

