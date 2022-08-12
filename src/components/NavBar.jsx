import React, { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const NavBar = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(true);


    const token = localStorage.getItem('token');


    const handleClose = () => setShow(false);

    const handleShow = () => {
        if (token) {
            setShow(true)
        } else {
            navigate("/login")
        }
    }

    const logout = () => {
        localStorage.setItem("token", "");
        navigate("/login")
    }

    return (
        <>
            <Navbar expand="lg"
                style={{ background: 'linear-gradient(to right, #1a2980, #26d0ce)', padding: '0', height: '4rem' }}>
                <Container  >
                    <Navbar.Brand style={{ color: '#fefefe', marginTop: '2rem' }}
                        href="#/">eCommerce</Navbar.Brand>
                    <Navbar.Toggle style={{ color: '#fefefe' }} aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse style={{ color: '#fefefe' }} id="basic-navbar-nav">
                        <Nav className="me-auto" style={{ marginTop: '2rem' }}>
                            <Nav.Link style={{ color: '#fefefe' }} href="/#/">Home</Nav.Link>
                            {/* <Nav.Link style={{ color: '#fefefe' }} href="/#/login">Login</Nav.Link> */}
                            <Nav.Link style={{ color: '#fefefe' }} href="/#/purchases">Purchases</Nav.Link>
                            {
                                token ? (
                                    <Nav.Link as={Button} onClick={logout}>log out </Nav.Link>
                                ) : (
                                    <Nav.Link href='/#/login'>Login </Nav.Link>
                                )
                            }
                            <Button variant="outline-dark" onClick={handleShow}>
                                carrito
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Cart show={show} handleClose={handleClose} />
        </>
    );
};

export default NavBar;