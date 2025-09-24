import { FaUserShield, FaUsers, FaPiggyBank } from "react-icons/fa";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <Container
            fluid
            className="d-flex flex-column align-items-center justify-content-center py-5"
            style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
        >
            <Card className="shadow-lg rounded-3 p-4" style={{ maxWidth: "900px", width: "100%" }}>
                <div className="text-center mb-4">
                    <FaUserShield size={80} className="text-primary mb-3" />
                    <h1 className="display-4 fw-bold">Admin Dashboard</h1>
                    <p className="text-muted">Bienvenido al área de administración del sistema</p>
                </div>

                {/* Acciones */}
                <div className="d-flex justify-content-center gap-3">
                    <Button variant="primary" onClick={() => navigate("/clientes")}>
                        Gestionar Clientes
                    </Button>
                    <Button variant="warning" onClick={() => navigate("/porcinos")}>
                        Gestionar Porcinos
                    </Button>
                    <Button variant="success" onClick={() => navigate("/alimentacion")}>
                        Gestionar Alimentación
                    </Button>
                </div>

            </Card>
        </Container>
    );
};

export default AdminPage;
