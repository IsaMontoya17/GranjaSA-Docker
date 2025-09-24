package com.example.entrega2.controller;

import com.example.entrega2.entity.Cliente;
import com.example.entrega2.entity.Porcino;
import com.example.entrega2.service.ClienteService;
import com.example.entrega2.dto.ClienteInput;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Controller
public class ClienteGraphQLController {

    private final ClienteService clienteService;

    public ClienteGraphQLController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @QueryMapping
    public List<Cliente> allClientes() {
        return clienteService.findAll();
    }

    @QueryMapping
    public Cliente clienteById(@Argument String cedula) {
        return clienteService.findById(cedula).orElse(null);
    }

    @MutationMapping
    public Cliente createCliente(@Argument("input") ClienteInput input) {
        Cliente cliente = new Cliente();
        cliente.setCedula(input.getCedula());
        cliente.setNombres(input.getNombres());
        cliente.setApellidos(input.getApellidos());
        cliente.setDireccion(input.getDireccion());
        cliente.setTelefono(input.getTelefono());
        return clienteService.save(cliente);
    }

    @MutationMapping
    public Cliente updateCliente(@Argument String cedula, @Argument("input") ClienteInput input) {
        Optional<Cliente> opt = clienteService.findById(cedula);
        if (opt.isEmpty()) {
            return null;
        }
        Cliente existing = opt.get();
        existing.setNombres(input.getNombres());
        existing.setApellidos(input.getApellidos());
        existing.setDireccion(input.getDireccion());
        existing.setTelefono(input.getTelefono());
        return clienteService.save(existing);
    }

    @MutationMapping
    public Boolean deleteCliente(@Argument String cedula) {
        return clienteService.findById(cedula).map(existing -> {
            clienteService.delete(cedula);
            return true;
        }).orElse(false);
    }

    @SchemaMapping(typeName = "Cliente", field = "porcinos")
    @Transactional
    public List<Porcino> porcinos(Cliente cliente) {
        return cliente.getPorcinos();
    }
}
