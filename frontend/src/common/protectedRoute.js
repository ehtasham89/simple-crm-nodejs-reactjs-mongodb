import React, {useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AUTH_STORAGE_KEY } from './constants';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "./../Auth/actions";

export default ({ component, action, ...rest }) => {
    const dispatch = useDispatch();
    const [token, setToken] = useState(localStorage.getItem(AUTH_STORAGE_KEY));
    const authState = useSelector(state => state.auth);
    const removeToken = e => setToken(null);

    useEffect(() => {
        if (action === 'logout') {
            dispatch(logout());

            removeToken();
        }
    });

    return (<Route {...rest}>
                {token !== null ? container(component, authState):<Redirect to="/" />}
            </Route>);
}

const container = (Component, authState) => (
    <div>
        <Navbar bg="light" style={{ borderBottom: "1px solid #e9e9e9"}} expand="lg">
            <Navbar.Brand href="#home">Simple CRM</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/user-list">Users List</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: {authState.user.name} {" "}({authState.user.email})
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>

        <Component />
    </div>
);

const NavLink = styled(Link)`
    color: rgba(0, 0, 0, 0.5);
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    &:hover {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.7);
    }
`;