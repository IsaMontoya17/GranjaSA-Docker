package com.example.entrega2.service;

import com.example.entrega2.entity.Cliente;
import com.example.entrega2.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }


    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }


    public Optional<Cliente> findById(String cedula) {
        return clienteRepository.findById(cedula);
    }


    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }


    public void delete(String cedula) {
        clienteRepository.deleteById(cedula);
    }
}
