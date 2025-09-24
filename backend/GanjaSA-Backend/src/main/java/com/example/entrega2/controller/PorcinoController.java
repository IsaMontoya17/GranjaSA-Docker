package com.example.entrega2.controller;

import com.example.entrega2.entity.Porcino;
import com.example.entrega2.service.PorcinoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/porcinos")
@CrossOrigin(origins = "*")
public class PorcinoController {

    private final PorcinoService porcinoService;

    public PorcinoController(PorcinoService porcinoService) {
        this.porcinoService = porcinoService;
    }

    @GetMapping
    public ResponseEntity<List<Porcino>> getAll() {
        return ResponseEntity.ok(porcinoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return porcinoService.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body("❌ Porcino con id " + id + " no encontrado"));
    }

    @PostMapping
    public ResponseEntity<Porcino> create(@RequestBody Porcino porcino) {
        return ResponseEntity.ok(porcinoService.save(porcino));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Porcino porcino) {
        return porcinoService.findById(id)
                .<ResponseEntity<?>>map(existing -> {
                    existing.setIdentificacion(porcino.getIdentificacion());
                    existing.setRaza(porcino.getRaza());
                    existing.setEdad(porcino.getEdad());
                    existing.setPeso(porcino.getPeso());
                    existing.setCliente(porcino.getCliente());
                    existing.setAlimentacion(porcino.getAlimentacion());
                    return ResponseEntity.ok(porcinoService.save(existing));
                })
                .orElse(ResponseEntity.status(404).body("❌ No se puede actualizar, id " + id + " no encontrado"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return porcinoService.findById(id)
                .<ResponseEntity<?>>map(existing -> {
                    porcinoService.delete(id);
                    return ResponseEntity.ok("✅ Porcino eliminado correctamente");
                })
                .orElse(ResponseEntity.status(404).body("❌ No se puede eliminar, id " + id + " no encontrado"));
    }
}
