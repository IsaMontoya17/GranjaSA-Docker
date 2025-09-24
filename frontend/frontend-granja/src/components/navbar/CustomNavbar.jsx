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
                        <Nav className="me-auto">

                            <NavDropdown
                                title={
                                    <span>
                                        <i className="fas fa-pig me-1"></i>
                                        Gestión de Porcinos
                                    </span>
                                }
                                id="porcinos-dropdown"
                            >
                                <NavDropdown.Item as={NavLink} to="/porcinos">
                                    <i className="fas fa-list me-2"></i>
                                    Listar todos los porcinos
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/porcinos/nuevo">
                                    <i className="fas fa-plus-circle me-2"></i>
                                    Registrar nuevo porcino
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown
                                title={
                                    <span>
                                        <i className="fas fa-users me-1"></i>
                                        Gestión de Clientes
                                    </span>
                                }
                                id="clientes-dropdown"
                            >
                                <NavDropdown.Item as={NavLink} to="/clientes">
                                    <i className="fas fa-list me-2"></i>
                                    Listar todos los clientes
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/clientes/nuevo">
                                    <i className="fas fa-user-plus me-2"></i>
                                    Registrar nuevo cliente
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown
                                title={
                                    <span>
                                        <i className="fas fa-utensils me-1"></i>
                                        Alimentación
                                    </span>
                                }
                                id="alimentacion-dropdown"
                            >
                                <NavDropdown.Item as={NavLink} to="/alimentacion">
                                    <i className="fas fa-list me-2"></i>
                                    Tipos de alimentación
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/alimentacion/nuevo">
                                    <i className="fas fa-plus-circle me-2"></i>
                                    Registrar nueva alimentación
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link as={NavLink} to="/reportes" className="nav-link">
                                <i className="fas fa-chart-line me-1"></i>
                                Reportes
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default CustomNavbar;
