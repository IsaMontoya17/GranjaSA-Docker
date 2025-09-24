import { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import styles from "./PorcinoForm.module.css";
import { createPorcino } from "../../services/porcinosService";
import { getClientes } from "../../services/clientesService";
import { getAlimentaciones } from "../../services/alimentacionService";

const PorcinoForm = () => {
  const [identificacion, setIdentificacion] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [alimentacionId, setAlimentacionId] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [alimentaciones, setAlimentaciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const razasEnum = ["YORK", "HAMP", "DUROC"];

  // Cargar clientes y alimentaciones desde GraphQL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alimentacionesData, clientesData] = await Promise.all([
          getAlimentaciones(),
          getClientes(),
        ]);

        setAlimentaciones(alimentacionesData);
        setClientes(clientesData);
        setLoading(false);
      } catch (err) {
        setError("❌ " + err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    if (!identificacion.trim()) {
      setError("❌ La identificación del porcino es obligatoria");
      return;
    }
    if (!raza) {
      setError("❌ Debes seleccionar una raza válida");
      return;
    }
    if (edad < 0) {
      setError("❌ La edad no puede ser negativa");
      return;
    }
    if (peso < 0) {
      setError("❌ El peso no puede ser negativo");
      return;
    }

    try {
      await createPorcino({
        identificacion: identificacion.trim(),
        raza,
        edad: parseInt(edad, 10),
        peso: parseFloat(peso),
        clienteCedula: clienteId,
        alimentacionId: alimentacionId ? parseInt(alimentacionId, 10) : null,
      });

      setMensaje("✅ Porcino registrado correctamente");
      setIdentificacion("");
      setRaza("");
      setEdad("");
      setPeso("");
      setAlimentacionId("");
      setClienteId("");
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="dark" />
        <p className="mt-2">Cargando datos...</p>
      </div>
    );
  }

  return (
    <Card className={`p-4 shadow-sm ${styles.card}`}>
      <h3 className="mb-3">Registrar Porcino</h3>

      {mensaje && <Alert variant="success">{mensaje}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Identificación</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej. P-001"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Raza</Form.Label>
          <Form.Select
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
            required
          >
            <option value="">-- Seleccione una raza --</option>
            {razasEnum.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Edad (meses)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            placeholder="Ej. 6"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Peso (kg)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            placeholder="Ej. 120"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Alimentación</Form.Label>
          <Form.Select
            value={alimentacionId}
            onChange={(e) => setAlimentacionId(e.target.value)}
            required
          >
            <option value="">-- Seleccione una alimentación --</option>
            {alimentaciones.map((a) => (
              <option key={a.id} value={a.id}>
                {a.descripcion} ({a.dosis})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cliente</Form.Label>
          <Form.Select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
          >
            <option value="">-- Seleccione un cliente --</option>
            {clientes.map((c) => (
              <option key={c.cedula} value={c.cedula}>
                {c.cedula} - {c.nombres} {c.apellidos}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Guardar Porcino
        </Button>
      </Form>
    </Card>
  );
};

export default PorcinoForm;
