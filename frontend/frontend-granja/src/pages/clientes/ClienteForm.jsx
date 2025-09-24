import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import styles from "./ClienteForm.module.css";

const ClienteForm = () => {
  const [cedula, setCedula] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const API = "http://localhost:8090/api/clientes";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    
    if (!cedula.trim() || !nombres.trim() || !apellidos.trim()) {
      setError("❌ La cédula, nombres y apellidos son obligatorios");
      return;
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cedula: cedula.trim(),
          nombres: nombres.trim(),
          apellidos: apellidos.trim(),
          direccion: direccion.trim(),
          telefono: telefono.trim(),
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Error al registrar el cliente");
      }

      await response.json();
      setMensaje("✅ Cliente registrado correctamente");
      setCedula("");
      setNombres("");
      setApellidos("");
      setDireccion("");
      setTelefono("");
    } catch (err) {
      setError("❌ " + (err.message || "Error desconocido"));
    }
  };

  return (
    <Card className={`p-4 shadow-sm ${styles.card}`}>
      <h3 className="mb-3">Registrar Cliente</h3>

      {mensaje && <Alert variant="success">{mensaje}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Cédula</Form.Label>
          <Form.Control
            type="number"
            min="0"
            placeholder="Ej. 1020304050"
            value={cedula}
            onChange={(e) => setCedula(e.target.value.replace(/\D/, ""))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombres</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej. Juan Carlos"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej. Pérez Gómez"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej. Calle 10 #20-30"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="number"
            min="0"
            placeholder="Ej. 3001234567"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value.replace(/\D/, ""))}
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Guardar Cliente
        </Button>
      </Form>
    </Card>
  );
};

export default ClienteForm;
