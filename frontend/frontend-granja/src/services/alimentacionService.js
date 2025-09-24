import { gql } from "@apollo/client";
import client from "../services/apolloClient";

export const getAlimentaciones = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          allAlimentaciones {
            id
            descripcion
            dosis
          }
        }
      `,
      fetchPolicy: "no-cache", 
    });
    return data.allAlimentaciones;
  } catch (error) {
    console.error("getAlimentaciones error:", error);
    throw error;
  }
};

export const createAlimentacion = async (alimentacion) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation ($input: AlimentacionInput!) {
          createAlimentacion(input: $input) {
            id
            descripcion
            dosis
          }
        }
      `,
      variables: { input: alimentacion },
    });
    return data.createAlimentacion;
  } catch (error) {
    console.error("createAlimentacion error:", error);
    throw error;
  }
};

export const updateAlimentacion = async (id, alimentacion) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation ($id: ID!, $input: AlimentacionInput!) {
          updateAlimentacion(id: $id, input: $input) {
            id
            descripcion
            dosis
          }
        }
      `,
      variables: {
        id: String(id),
        input: {
          descripcion: alimentacion.descripcion,
          dosis: alimentacion.dosis,
        },
      },
    });

    return data.updateAlimentacion;
  } catch (error) {
    console.error("updateAlimentacion error:", error);
    throw error;
  }
};

export const deleteAlimentacion = async (id) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation ($id: ID!) {
          deleteAlimentacion(id: $id)
        }
      `,
      variables: { id },
    });
    return data.deleteAlimentacion;
  } catch (error) {
    console.error("deleteAlimentacion error:", error);
    throw error;
  }
};
