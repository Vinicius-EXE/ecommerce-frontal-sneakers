package com.frontalsneakers.api.service;

import com.frontalsneakers.api.model.Carrinho;

public interface CarrinhoService {
    Carrinho getCarrinhoByUsuarioId(Long usuarioId);

    Carrinho addItemAoCarrinho(Long usuarioId, Long variacaoProdutoId, int quantidade);

    Carrinho removeItemDoCarrinho(Long usuarioId, Long itemCarrinhoId);

    void limparCarrinho(Long usuarioId);
}
