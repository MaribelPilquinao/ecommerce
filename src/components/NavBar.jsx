import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg="" expand="lg" style={{background: 'linear-gradient(to right, #1a2980, #26d0ce)'}}>
            <Container  >
                <Navbar.Brand style={{color: '#fefefe'}}
                href="#/">eCommerce</Navbar.Brand>
                <Navbar.Toggle style={{color: '#fefefe'}} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse style={{color: '#fefefe'}}id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link style={{color: '#fefefe'}}  href="/#/">Home</Nav.Link>
                        <Nav.Link style={{color: '#fefefe'}}  href="/#/login">Login</Nav.Link>
                        <Nav.Link style={{color: '#fefefe'}}  href="/#/purchases">Purchases</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;