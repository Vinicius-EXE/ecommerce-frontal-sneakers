package com.frontalsneakers.api.service;

import com.frontalsneakers.api.model.Marca;

import java.util.List;

public interface MarcaService {
    List<Marca> findAll();

    Marca findById(Long id);

    Marca create(Marca marca);

    Marca update(Long id, Marca marcaDetails);

    void delete(Long id);
}
