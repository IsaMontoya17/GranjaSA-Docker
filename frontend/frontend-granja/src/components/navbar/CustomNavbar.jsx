import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

const CustomNavbar = () => {
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark" className="px-3">
                <Container fluid>
                    <Navbar.Brand className="fw-bold d-flex align-items-center" as={NavLink} to="/">
                        <i className="fas fa-piggy-bank me-2"></i>
                        <span className="d-none d-md-inline">Granja - Sistema Porcino</span>
                        <span className="d-inline d-md-none">Sistema Porcino</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default CustomNavbar;
