import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import styles from "./AlimentacionForm.module.css";

const AlimentacionForm = () => {
  const [descripcion, setDescripcion] = useState("");
  const [dosis, setDosis] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    // validación: descripción no puede ser solo números
    if (/^\d+$/.test(descripcion.trim())) {
      setError("❌ La descripción no puede ser solo números");
      return;
    }

    try {
      const response = await fetch("http://localhost:8090/api/alimentaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion, dosis }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar la alimentación");
      }

      setMensaje("✅ Alimentación registrada con éxito");
      setDescripcion("");
      setDosis("");
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  return (
    <Card className={`p-4 shadow-sm ${styles.card}`}>
      <h3 className="mb-3">Registrar Alimentación</h3>

      {mensaje && <Alert variant="success">{mensaje}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej. Alimentación balanceada"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dosis</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej. 2 kg diarios"
            value={dosis}
            onChange={(e) => setDosis(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Guardar
        </Button>
      </Form>
    </Card>
  );
};

export default AlimentacionForm;
