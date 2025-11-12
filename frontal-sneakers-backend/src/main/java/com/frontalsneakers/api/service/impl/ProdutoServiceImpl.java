package com.frontalsneakers.api.service.impl;

import com.frontalsneakers.api.exception.ResourceNotFoundException;
import com.frontalsneakers.api.model.Produto;
import com.frontalsneakers.api.repository.ProdutoRepository;
import com.frontalsneakers.api.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoServiceImpl implements ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public Produto findById(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id: " + id));
    }

    @Override
    public Produto findBySlug(String slug) {
        return produtoRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com slug: " + slug));
    }

    @Override
    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }
}
