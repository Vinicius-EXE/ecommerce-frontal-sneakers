package com.frontalsneakers.api.service;

import com.frontalsneakers.api.model.Categoria;

import java.util.List;

public interface CategoriaService {
    List<Categoria> findAll();

    Categoria findById(Long id);

    Categoria create(Categoria marca);

    Categoria update(Long id, Categoria marcaDetails);

    void delete(Long id);
}
