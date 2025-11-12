package com.frontalsneakers.api.service;

import com.frontalsneakers.api.model.VariacaoProduto;

import java.util.List;

public interface VariacaoProdutoService {
    List<VariacaoProduto> findByProdutoId(Long produtoId);

    VariacaoProduto findById(Long id);

    VariacaoProduto create(Long produtoId, VariacaoProduto variacao);

    VariacaoProduto update(Long id, VariacaoProduto variacaoDetails);

    void delete(Long id);
}
