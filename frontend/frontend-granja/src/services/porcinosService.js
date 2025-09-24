import { gql } from "@apollo/client";
import client from "../services/apolloClient";

export const createPorcino = async (porcino) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
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

    return data.createPorcino;
  } catch (error) {
    console.error("createPorcino error:", error);
    throw error;
  }
};

export const getPorcinos = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
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
      fetchPolicy: "no-cache", 
    });

    return data.allPorcinos;
  } catch (error) {
    console.error("getPorcinos error:", error);
    throw error;
  }
};

export const deletePorcino = async (id) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation ($id: ID!) {
          deletePorcino(id: $id)
        }
      `,
      variables: { id },
    });

    return data.deletePorcino;
  } catch (error) {
    console.error("deletePorcino error:", error);
    throw error;
  }
};

export const updatePorcino = async (id, porcino) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation ($id: ID!, $input: PorcinoInput!) {
          updatePorcino(id: $id, input: $input) {
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
        id: parseInt(id), 
        input: {
          identificacion: porcino.identificacion,
          raza: porcino.raza,
          edad: parseInt(porcino.edad),
          peso: parseFloat(porcino.peso),
          clienteCedula: String(porcino.clienteCedula), 
          alimentacionId: porcino.alimentacionId
            ? parseInt(porcino.alimentacionId)
            : null, 
        },
      },
    });

    return data.updatePorcino;
  } catch (error) {
    console.error("updatePorcino error:", error);
    throw error;
  }
};
