import { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Row, Col, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getPorcinos, deletePorcino, updatePorcino } from "../../services/porcinosService"; 
import { getAlimentaciones } from "../../services/alimentacionService"; 
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PorcinosList = () => {
    const [porcinos, setPorcinos] = useState([]);
    const [alimentaciones, setAlimentaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPorcino, setSelectedPorcino] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const dataPorcinos = await getPorcinos();
            const dataAlimentaciones = await getAlimentaciones();
            setPorcinos(dataPorcinos);
            setAlimentaciones(dataAlimentaciones);
        } catch (error) {
            console.error("Error al cargar datos:", error);
            Swal.fire("Error", "No se pudieron cargar los datos", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (porcino) => {
        setSelectedPorcino({ 
            ...porcino, 
            alimentacionId: porcino.alimentacion?.id || null 
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const porcinoActualizado = {
                ...selectedPorcino,
                edad: parseInt(selectedPorcino.edad),
                peso: parseFloat(selectedPorcino.peso),
            };

            await updatePorcino(selectedPorcino.id, porcinoActualizado);
            Swal.fire("✅ Éxito", "Porcino actualizado correctamente", "success");
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error("Error al actualizar:", error);
            Swal.fire("❌ Error", "No se pudo actualizar el porcino", "error");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (confirmDelete.isConfirmed) {
            try {
                await deletePorcino(id);
                await fetchData();
                Swal.fire("Eliminado", "El porcino ha sido eliminado.", "success");
            } catch (error) {
                console.error("Error al eliminar:", error);
                Swal.fire("Error", "No se pudo eliminar el porcino.", "error");
            }
        }
    };

    if (loading) {
        return (
            <Container
                fluid
                className="d-flex flex-column align-items-center justify-content-center text-center"
                style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
            >
                <Spinner animation="border" variant="dark" />
                <p className="mt-3">Cargando porcinos...</p>
            </Container>
        );
    }

    return (
        <Container
            fluid
            className="d-flex flex-column align-items-center justify-content-start py-4"
            style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
        >
            <div
                className="bg-white shadow-lg rounded-3 p-4"
                style={{ width: "100%", maxWidth: "1100px" }}
            >
                <Row className="align-items-center mb-4">
                    <Col>
                        <h2 className="fw-bold text-dark border-bottom pb-2">
                            Lista de Porcinos
                        </h2>
                    </Col>
                    <Col className="text-end">
                        <Button
                            variant="success"
                            onClick={() => navigate("/porcinos/nuevo")}
                        >
                            <FaPlus className="me-1" /> Agregar Nuevo
                        </Button>
                    </Col>
                </Row>

                <Table hover responsive className="align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Identificación</th>
                            <th>Raza</th>
                            <th>Edad</th>
                            <th>Peso</th>
                            <th>Alimentación</th>
                            <th>Dosis</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {porcinos.map((porcino) => (
                            <tr key={porcino.id}>
                                <td>{porcino.identificacion}</td>
                                <td>{porcino.raza}</td>
                                <td>{porcino.edad}</td>
                                <td>{porcino.peso}</td>
                                <td>{porcino.alimentacion?.descripcion}</td>
                                <td>{porcino.alimentacion?.dosis}</td>
                                <td className="text-center">
                                    <Button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleEdit(porcino)}
                                    >
                                        <FaEdit className="me-1" /> Editar
                                    </Button>
                                    <Button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(porcino.id)}
                                    >
                                        <FaTrash className="me-1" /> Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Porcino</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPorcino && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Identificación</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedPorcino.identificacion}
                                    onChange={(e) =>
                                        setSelectedPorcino({ ...selectedPorcino, identificacion: e.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Raza</Form.Label>
                                <Form.Select
                                    value={selectedPorcino.raza}
                                    onChange={(e) =>
                                        setSelectedPorcino({ ...selectedPorcino, raza: e.target.value })
                                    }
                                >
                                    <option value="YORK">YORK</option>
                                    <option value="HAMP">HAMP</option>
                                    <option value="DUROC">DUROC</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Edad</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    value={selectedPorcino.edad}
                                    onChange={(e) =>
                                        setSelectedPorcino({ ...selectedPorcino, edad: e.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Peso (kg)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    value={selectedPorcino.peso}
                                    onChange={(e) =>
                                        setSelectedPorcino({ ...selectedPorcino, peso: e.target.value })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Alimentación</Form.Label>
                                <Form.Select
                                    value={selectedPorcino.alimentacionId || ""}
                                    onChange={(e) => {
                                        const alimentacionSeleccionada = alimentaciones.find(
                                            (a) => a.id === parseInt(e.target.value)
                                        );
                                        setSelectedPorcino({
                                            ...selectedPorcino,
                                            alimentacionId: alimentacionSeleccionada?.id ?? null,
                                            alimentacion: alimentacionSeleccionada, 
                                        });
                                    }}
                                >
                                    <option value="">Seleccione una alimentación</option>
                                    {alimentaciones.map((a) => (
                                        <option key={a.id} value={a.id}>
                                            {a.descripcion} (Dosis: {a.dosis})
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PorcinosList;
