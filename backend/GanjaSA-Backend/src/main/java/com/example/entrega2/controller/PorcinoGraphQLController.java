package com.example.entrega2.controller;

import com.example.entrega2.dto.PorcinoInput;
import com.example.entrega2.entity.*;
import com.example.entrega2.service.*;
import org.springframework.graphql.data.method.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class PorcinoGraphQLController {

    private final PorcinoService porcinoService;
    private final ClienteService clienteService;
    private final AlimentacionService alimentacionService;

    public PorcinoGraphQLController(PorcinoService porcinoService,
                                    ClienteService clienteService,
                                    AlimentacionService alimentacionService) {
        this.porcinoService = porcinoService;
        this.clienteService = clienteService;
        this.alimentacionService = alimentacionService;
    }

    @QueryMapping
    public List<Porcino> allPorcinos() {
        return porcinoService.findAll();
    }

    @QueryMapping
    public Porcino porcinoById(@Argument Long id) {
        return porcinoService.findById(id).orElse(null);
    }

    @MutationMapping
    public Porcino createPorcino(@Argument("input") PorcinoInput input) {
        Porcino porcino = new Porcino();
        porcino.setIdentificacion(input.getIdentificacion());
        porcino.setRaza(Raza.valueOf(input.getRaza()));
        porcino.setEdad(input.getEdad());
        porcino.setPeso(input.getPeso());

        clienteService.findById(input.getClienteCedula())
                .ifPresent(porcino::setCliente);

        if (input.getAlimentacionId() != null) {
            alimentacionService.findById(input.getAlimentacionId())
                    .ifPresent(porcino::setAlimentacion);
        }

        return porcinoService.save(porcino);
    }

    @MutationMapping
    public Porcino updatePorcino(@Argument Long id, @Argument("input") PorcinoInput input) {
        Optional<Porcino> opt = porcinoService.findById(id);
        if (opt.isEmpty()) return null;

        Porcino existing = opt.get();
        existing.setIdentificacion(input.getIdentificacion());
        existing.setRaza(Raza.valueOf(input.getRaza()));
        existing.setEdad(input.getEdad());
        existing.setPeso(input.getPeso());

        clienteService.findById(input.getClienteCedula())
                .ifPresent(existing::setCliente);

        if (input.getAlimentacionId() != null) {
            alimentacionService.findById(input.getAlimentacionId())
                    .ifPresent(existing::setAlimentacion);
        }

        return porcinoService.save(existing);
    }

    @MutationMapping
    public Boolean deletePorcino(@Argument Long id) {
        return porcinoService.findById(id).map(existing -> {
            porcinoService.delete(id);
            return true;
        }).orElse(false);
    }
}
