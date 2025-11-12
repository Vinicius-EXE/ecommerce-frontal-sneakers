package com.frontalsneakers.api.service;

import com.frontalsneakers.api.model.Produto;

import java.util.List;

public interface ProdutoService {
    Produto findById(Long id);

    Produto findBySlug(String slug);

    List<Produto> findAll();
}
