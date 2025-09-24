import { gql } from "@apollo/client";
import client from "../services/apolloClient";

export const createCliente = async (cliente) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation ($input: ClienteInput!) {
          createCliente(input: $input) {
            cedula
            nombres
            apellidos
            direccion
            telefono
          }
        }
      `,
      variables: {
        input: {
          cedula: cliente.cedula,
          nombres: cliente.nombres,
          apellidos: cliente.apellidos,
          direccion: cliente.direccion,
          telefono: cliente.telefono,
        },
      },
    });

    return data.createCliente;
  } catch (error) {
    console.error("createCliente error:", error);
    throw error;
  }
};

export const getClientes = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
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
      fetchPolicy: "no-cache",
    });

    return data.allClientes;
  } catch (error) {
    console.error("getClientes error:", error);
    throw error;
  }
};

export const deleteCliente = async (cedula) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation ($cedula: ID!) {
          deleteCliente(cedula: $cedula)
        }
      `,
      variables: { cedula },
    });

    return data.deleteCliente;
  } catch (error) {
    console.error("deleteCliente error:", error);
    throw error;
  }
};

export const updateCliente = async (cedula, cliente) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation ($cedula: ID!, $input: ClienteInput!) {
          updateCliente(cedula: $cedula, input: $input) {
            cedula
            nombres
            apellidos
            direccion
            telefono
          }
        }
      `,
      variables: {
        cedula, 
        input: {
          nombres: cliente.nombres,
          apellidos: cliente.apellidos,
          direccion: cliente.direccion,
          telefono: cliente.telefono,
        },
      },
    });

    return data.updateCliente;
  } catch (error) {
    console.error("updateCliente error:", error);
    throw error;
  }
};
