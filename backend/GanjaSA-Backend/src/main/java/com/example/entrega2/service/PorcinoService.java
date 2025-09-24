package com.example.entrega2.service;

import com.example.entrega2.entity.Porcino;
import com.example.entrega2.repository.PorcinoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PorcinoService {

    private final PorcinoRepository porcinoRepository;

    public PorcinoService(PorcinoRepository porcinoRepository) {
        this.porcinoRepository = porcinoRepository;
    }

    public List<Porcino> findAll() {
        return porcinoRepository.findAll();
    }

    public Optional<Porcino> findById(Long id) {
        return porcinoRepository.findById(id);
    }

    public Porcino save(Porcino porcino) {
        return porcinoRepository.save(porcino);
    }

    public void delete(Long id) {
        porcinoRepository.deleteById(id);
    }
}
