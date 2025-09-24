const API_URL_GRAPHQL = "http://localhost:8090/graphql";

export const getAlimentaciones = async () => {
  try {
    const response = await fetch(API_URL_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          {
            allAlimentaciones {
              id
              descripcion
              dosis
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.allAlimentaciones;
  } catch (error) {
    console.error("getAlimentaciones error:", error);
    throw error;
  }
};

export const createAlimentacion = async (alimentacion) => {
  try {
    const response = await fetch(API_URL_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            createAlimentacion(
              input: {
                descripcion: "${alimentacion.descripcion}",
                dosis: "${alimentacion.dosis}"
              }
            ) {
              id
              descripcion
              dosis
            }
          }
        `,
      }),
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.createAlimentacion;
  } catch (error) {
    console.error("createAlimentacion error:", error);
    throw error;
  }
};

export const updateAlimentacion = async (id, alimentacion) => {
  try {
    const response = await fetch(API_URL_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            updateAlimentacion(
              id: ${id},
              input: {
                descripcion: "${alimentacion.descripcion}",
                dosis: "${alimentacion.dosis}"
              }
            ) {
              id
              descripcion
              dosis
            }
          }
        `,
      }),
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.updateAlimentacion;
  } catch (error) {
    console.error("updateAlimentacion error:", error);
    throw error;
  }
};

export const deleteAlimentacion = async (id) => {
  try {
    const response = await fetch(API_URL_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation {
            deleteAlimentacion(id: ${id})
          }
        `,
      }),
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.deleteAlimentacion; 
  } catch (error) {
    console.error("deleteAlimentacion error:", error);
    throw error;
  }
};
