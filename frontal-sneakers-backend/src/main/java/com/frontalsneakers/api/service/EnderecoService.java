package com.frontalsneakers.api.service;

import com.frontalsneakers.api.model.Endereco;

import java.util.List;

public interface EnderecoService {
    List<Endereco> findByUsuarioId(Long usuarioId);

    Endereco findById(Long id);

    Endereco create(Long usuarioId, Endereco endereco);

    Endereco update(Long id, Endereco enderecoDetails);

    void delete(Long id);
}
