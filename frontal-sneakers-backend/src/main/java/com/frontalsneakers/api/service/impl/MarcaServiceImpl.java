package com.frontalsneakers.api.service.impl;


import com.frontalsneakers.api.exception.ResourceNotFoundException;
import com.frontalsneakers.api.model.Marca;
import com.frontalsneakers.api.repository.MarcaRepository;
import com.frontalsneakers.api.service.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaServiceImpl implements MarcaService {
    @Autowired
    private MarcaRepository marcaRepository;

    @Override
    public List<Marca> findAll() {
        return marcaRepository.findAll();
    }

    @Override
    public Marca findById(Long id) {
        return marcaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Marca não encontrada com id: " + id));
    }

    @Override
    public Marca create(Marca marca) {
        return marcaRepository.save(marca);
    }

    @Override
    public Marca update(Long id, Marca marcaDetails) {
        Marca marca = findById(id);
        marca.setNome(marcaDetails.getNome());
        return marcaRepository.save(marca);
    }

    @Override
    public void delete(Long id) {
        Marca marca = findById(id);
        marcaRepository.delete(marca);
    }
}
