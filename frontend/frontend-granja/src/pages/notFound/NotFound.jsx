import { FaExclamationTriangle } from "react-icons/fa";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <FaExclamationTriangle size={80} className="text-warning mb-3" />
      <h1 className="display-4 fw-bold">404</h1>
      <h2 className="mb-3 text-muted">Página no encontrada</h2>
      <p className="mb-4">
        La página que buscas no existe o ha sido movida.
      </p>
      <Button variant="dark" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Container>
  );
};

export default NotFound;
