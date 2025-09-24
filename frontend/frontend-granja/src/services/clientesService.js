import axios from "axios";

const API_URL_GRAPHQL = "http://localhost:8090/graphql";

export const createCliente = async (cliente) => {
  try {
    const response = await fetch(API_URL_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            createCliente(
              input: {
                cedula: "${cliente.cedula}",
                nombres: "${cliente.nombres}",
                apellidos: "${cliente.apellidos}",
                direccion: "${cliente.direccion}",
                telefono: "${cliente.telefono}"
              }
            ) {
              cedula
              nombres
              apellidos
              direccion
              telefono
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.createCliente;
  } catch (error) {
    console.error("createCliente error:", error);
    throw error;
  }
};

export const getClientes = async () => {
  try {
    const response = await fetch(API_URL_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          {
            allClientes {
              cedula
              nombres
              apellidos
              direccion
              telefono
              porcinos {
                id
                identificacion
                raza
                edad
                peso
              }
            }
          }
        `,
      }),
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.allClientes;
  } catch (error) {
    console.error("Error en getClientes:", error);
    throw error;
  }
};

export const deleteCliente = async (cedula) => {
  try {
    const response = await fetch(API_URL_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            deleteCliente(cedula: "${cedula}")
          }
        `,
      }),
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.deleteCliente; 
  } catch (error) {
    console.error("deleteCliente error:", error);
    throw error;
  }
};

export const updateCliente = async (cedula, cliente) => {
  try {
    const response = await fetch(API_URL_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            updateCliente(
              cedula: "${cedula}",
              input: {
                nombres: "${cliente.nombres}",
                apellidos: "${cliente.apellidos}",
                direccion: "${cliente.direccion}",
                telefono: "${cliente.telefono}"
              }
            ) {
              cedula
              nombres
              apellidos
              direccion
              telefono
            }
          }
        `,
      }),
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.updateCliente;
  } catch (error) {
    console.error("updateCliente error:", error);
    throw error;
  }
};

