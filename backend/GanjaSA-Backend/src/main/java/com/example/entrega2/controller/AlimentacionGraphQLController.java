package com.example.entrega2.controller;

import com.example.entrega2.dto.AlimentacionInput;
import com.example.entrega2.entity.Alimentacion;
import com.example.entrega2.service.AlimentacionService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class AlimentacionGraphQLController {

    private final AlimentacionService alimentacionService;

    public AlimentacionGraphQLController(AlimentacionService alimentacionService) {
        this.alimentacionService = alimentacionService;
    }

    @QueryMapping
    public List<Alimentacion> allAlimentaciones() {
        return alimentacionService.findAll();
    }

    @QueryMapping
    public Optional<Alimentacion> alimentacionById(@Argument Long id) {
        return alimentacionService.findById(id);
    }

    @MutationMapping
    public Alimentacion createAlimentacion(@Argument AlimentacionInput input) {
        Alimentacion alimentacion = new Alimentacion();
        alimentacion.setDescripcion(input.getDescripcion());
        alimentacion.setDosis(input.getDosis());
        return alimentacionService.save(alimentacion);
    }

    @MutationMapping
    public Alimentacion updateAlimentacion(@Argument Long id, @Argument AlimentacionInput input) {
        return alimentacionService.findById(id)
                .map(existing -> {
                    existing.setDescripcion(input.getDescripcion());
                    existing.setDosis(input.getDosis());
                    return alimentacionService.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("❌ Alimentación con id " + id + " no encontrada"));
    }

    @MutationMapping
    public Boolean deleteAlimentacion(@Argument Long id) {
        return alimentacionService.findById(id).map(existing -> {
            alimentacionService.delete(id);
            return true;
        }).orElse(false);
    }
}
