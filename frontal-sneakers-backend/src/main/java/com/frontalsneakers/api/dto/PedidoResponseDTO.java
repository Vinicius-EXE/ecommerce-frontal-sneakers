package com.frontalsneakers.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PedidoResponseDTO {
    private Long id;
    private LocalDateTime dataPedido;
    private String status;
    private BigDecimal total;
    private EnderecoResponseDTO enderecoEntrega;
    private List<ItemPedidoResponseDTO> itens;
}
