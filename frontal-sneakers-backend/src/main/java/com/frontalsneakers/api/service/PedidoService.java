package com.frontalsneakers.api.service;

import com.frontalsneakers.api.model.Pedido;

import java.util.List;

public interface PedidoService {
    List<Pedido> findByUsuarioId(Long usuarioId);

    Pedido findById(Long id);

    Pedido createPedido(Long usuarioId, Long enderecoEntregaId);
}
