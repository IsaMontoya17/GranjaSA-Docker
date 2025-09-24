import axios from "axios";

const API_URL_CLIENTES = "http://localhost:8090/api/clientes";

export const getClientes = async () => {
    try {
        const response = await fetch(API_URL_CLIENTES);
        if (!response.ok) {
            throw new Error("Error al obtener clientes");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getClientes:", error);
        throw error;
    }
};

export const deleteCliente = async (cedula) => {
    try {
        const response = await fetch(`${API_URL_CLIENTES}/${cedula}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el cliente");
        }

        return true; // Éxito
    } catch (error) {
        console.error("deleteCliente error:", error);
        throw error;
    }
};

export const updateCliente = async (cedula, cliente) => {
    const response = await axios.put(`${API_URL_CLIENTES}/${cedula}`, cliente);
    return response.data;
};
