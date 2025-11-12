package com.frontalsneakers.api.service.impl;

import com.frontalsneakers.api.exception.ResourceNotFoundException;
import com.frontalsneakers.api.model.Categoria;
import com.frontalsneakers.api.repository.CategoriaRepository;
import com.frontalsneakers.api.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    @Override
    public Categoria findById(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada com id: " + id));
    }

    @Override
    public Categoria create(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public Categoria update(Long id, Categoria categoriaDetails) {
        Categoria categoria = findById(id);
        categoria.setNome(categoriaDetails.getNome());
        return categoriaRepository.save(categoria);
    }

    @Override
    public void delete(Long id) {
        Categoria categoria = findById(id);
        categoriaRepository.delete(categoria);
    }
}
