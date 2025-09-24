package com.example.entrega2.service;

import com.example.entrega2.entity.Alimentacion;
import com.example.entrega2.repository.AlimentacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlimentacionService {

    private final AlimentacionRepository alimentacionRepository;

    public AlimentacionService(AlimentacionRepository alimentacionRepository) {
        this.alimentacionRepository = alimentacionRepository;
    }

    public List<Alimentacion> findAll() {
        return alimentacionRepository.findAll();
    }


    public Optional<Alimentacion> findById(Long id) {
        return alimentacionRepository.findById(id);
    }


    public Alimentacion save(Alimentacion alimentacion) {
        return alimentacionRepository.save(alimentacion);
    }


    public void delete(Long id) {
        alimentacionRepository.deleteById(id);
    }
}
