import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar expand="lg"
            style={{ background: 'linear-gradient(to right, #1a2980, #26d0ce)', padding: '0', height: '4rem' }}>
            <Container  >
                <Navbar.Brand style={{ color: '#fefefe', marginTop: '2rem' }}
                    href="#/">eCommerce</Navbar.Brand>
                <Navbar.Toggle style={{ color: '#fefefe' }} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse style={{ color: '#fefefe' }} id="basic-navbar-nav">
                    <Nav className="me-auto" style={{ marginTop: '2rem' }}>
                        <Nav.Link style={{ color: '#fefefe' }} href="/#/">Home</Nav.Link>
                        <Nav.Link style={{ color: '#fefefe' }} href="/#/login">Login</Nav.Link>
                        <Nav.Link style={{ color: '#fefefe' }} href="/#/purchases">Purchases</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;