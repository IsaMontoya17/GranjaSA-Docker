import axios from "axios";
const API_URL_PORCINOS = "http://localhost:8090/api/porcinos";

export const getPorcinos = async () => {
    try {
        const response = await fetch(API_URL_PORCINOS);
        if (!response.ok) {
            throw new Error("Error al obtener porcinos");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getPorcinos:", error);
        throw error;
    }
};

export const deletePorcino = async (id) => {
    try {
        const response = await fetch(`${API_URL_PORCINOS}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el porcino");
        }

        return true; 
    } catch (error) {
        console.error("deletePorcino error:", error);
        throw error;
    }
};

export const updatePorcino = async (id, porcino) => {
    const response = await axios.put(`${API_URL_PORCINOS}/${id}`, porcino);
    return response.data;
};
