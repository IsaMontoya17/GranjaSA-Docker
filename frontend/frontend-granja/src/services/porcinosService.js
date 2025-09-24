import axios from "axios";

const API_URL = "http://localhost:8090/graphql";

export const createPorcino = async (porcino) => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        mutation ($input: PorcinoInput!) {
          createPorcino(input: $input) {
            id
            identificacion
            raza
            edad
            peso
            cliente {
              cedula
              nombres
            }
            alimentacion {
              id
              descripcion
              dosis
            }
          }
        }
      `,
      variables: {
        input: {
          identificacion: porcino.identificacion,
          raza: porcino.raza,
          edad: porcino.edad,
          peso: porcino.peso,
          clienteCedula: porcino.clienteCedula,
          alimentacionId: porcino.alimentacionId ?? null,
        },
      },
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.createPorcino;
  } catch (error) {
    console.error("createPorcino error:", error);
    throw error;
  }
};

export const getPorcinos = async () => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        {
          allPorcinos {
            id
            identificacion
            raza
            edad
            peso
            cliente {
              cedula
              nombres
            }
            alimentacion {
              id
              descripcion
              dosis
            }
          }
        }
      `,
    });

    return response.data.data.allPorcinos;
  } catch (error) {
    console.error("getPorcinos error:", error);
    throw error;
  }
};

export const deletePorcino = async (id) => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        mutation {
          deletePorcino(id: ${id})
        }
      `,
    });

    return response.data.data.deletePorcino;
  } catch (error) {
    console.error("deletePorcino error:", error);
    throw error;
  }
};

export const updatePorcino = async (id, porcino) => {
  try {
    const response = await axios.post(API_URL, {
      query: `
        mutation {
          updatePorcino(
            id: ${id},
            input: {
              identificacion: "${porcino.identificacion}"
              raza: "${porcino.raza}"
              edad: ${porcino.edad}
              peso: ${porcino.peso}
              clienteCedula: "${porcino.clienteCedula}"
              alimentacionId: ${porcino.alimentacionId ? parseInt(porcino.alimentacionId) : null}
            }
          ) {
            id
            identificacion
            raza
            edad
            peso
            cliente {
              cedula
              nombres
            }
            alimentacion {
              id
              descripcion
              dosis
            }
          }
        }
      `,
    });

    return response.data.data.updatePorcino;
  } catch (error) {
    console.error("updatePorcino error:", error);
    throw error;
  }
};
