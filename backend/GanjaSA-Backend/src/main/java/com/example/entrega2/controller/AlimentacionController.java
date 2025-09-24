package com.example.entrega2.controller;

import com.example.entrega2.entity.Alimentacion;
import com.example.entrega2.service.AlimentacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alimentaciones")
@CrossOrigin(origins = "*")
public class AlimentacionController {

    private final AlimentacionService alimentacionService;

    public AlimentacionController(AlimentacionService alimentacionService) {
        this.alimentacionService = alimentacionService;
    }

    @GetMapping
    public ResponseEntity<List<Alimentacion>> getAll() {
        return ResponseEntity.ok(alimentacionService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return alimentacionService.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).body("❌ Alimentación con id " + id + " no encontrada"));
    }

    @PostMapping
    public ResponseEntity<Alimentacion> create(@RequestBody Alimentacion alimentacion) {
        return ResponseEntity.ok(alimentacionService.save(alimentacion));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Alimentacion alimentacion) {
        return alimentacionService.findById(id)
                .<ResponseEntity<?>>map(existing -> {
                    existing.setDescripcion(alimentacion.getDescripcion());
                    existing.setDosis(alimentacion.getDosis());
                    return ResponseEntity.ok(alimentacionService.save(existing));
                })
                .orElse(ResponseEntity.status(404).body("❌ No se puede actualizar, id " + id + " no encontrado"));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return alimentacionService.findById(id)
                .map(existing -> {
                    alimentacionService.delete(id);
                    return ResponseEntity.ok("✅ Alimentación eliminada correctamente");
                })
                .orElse(ResponseEntity.status(404).body("❌ No se puede eliminar, id " + id + " no encontrado"));
    }
}
