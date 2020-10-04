import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { getLeadsList, deleteLeads, setCurrentLeads } from "./../actions";

export default () => {
    const title = `Leads List`;
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const authleadsState = useSelector(state => state.auth.user);
    const leadsState = useSelector(state => state.leads);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Page: ${title}`;
        
        dispatch(getLeadsList(authleadsState._id));
    },[]);

    return ( redirect ? <Redirect to="/signup-staff" /> :
            <CONTAINER>
                <h4>Simple CRM - {title} <Link style={{background: '#e6e6e6', float: 'right', fontSize: '18px', color: 'rgba(0,0,0,0.5)'}} to="/signup-staff">[ Add New Client ]</Link></h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Client Name</th>
                        <th>Client Phone</th>
                        <th>Client Email</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leadsState.list && leadsState.list.map((row, index) => (
                            <tr key={'row_'+index}>
                                <td>{(index+1)}</td>
                                <td>{row.name}</td>
                                <td>{row.phone}</td>
                                <td>{row.email}</td>
                                <td width="20%">
                                    <Button onClick={e => dispatch(setCurrentLeads(row, setRedirect))} style={{margin: '0 10px'}}>Edit</Button>
                                    <Button onClick={e => dispatch(deleteLeads(row._id, authleadsState._id))}>Delete</Button>
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

