package com.example.entrega2.controller;

import com.example.entrega2.entity.Cliente;
import com.example.entrega2.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> getAll() {
        return ResponseEntity.ok(clienteService.findAll());
    }

    @GetMapping("/{cedula}")
    public ResponseEntity<?> getById(@PathVariable String cedula) {
        return clienteService.findById(cedula)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body("❌ Cliente con cédula " + cedula + " no encontrado"));
    }

    @PostMapping
    public ResponseEntity<Cliente> create(@RequestBody Cliente cliente) {
        return ResponseEntity.ok(clienteService.save(cliente));
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<?> update(@PathVariable String cedula, @RequestBody Cliente cliente) {
        return clienteService.findById(cedula)
                .<ResponseEntity<?>>map(existing -> {
                    existing.setNombres(cliente.getNombres());
                    existing.setApellidos(cliente.getApellidos());
                    existing.setDireccion(cliente.getDireccion());
                    existing.setTelefono(cliente.getTelefono());
                    return ResponseEntity.ok(clienteService.save(existing));
                })
                .orElse(ResponseEntity.status(404).body("❌ No se puede actualizar, cliente con cédula " + cedula + " no encontrado"));
    }

    @DeleteMapping("/{cedula}")
    public ResponseEntity<?> delete(@PathVariable String cedula) {
        return clienteService.findById(cedula)
                .<ResponseEntity<?>>map(existing -> {
                    clienteService.delete(cedula);
                    return ResponseEntity.ok("✅ Cliente eliminado correctamente");
                })
                .orElse(ResponseEntity.status(404).body("❌ No se puede eliminar, cliente con cédula " + cedula + " no encontrado"));
    }
}
