package com.frontalsneakers.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ItemPedidoResponseDTO {
    private Long id;
    private Integer quantidade;
    private BigDecimal precoNoMomento; // Preço salvo na hora da compra [cite: 82]
    private Long variacaoProdutoId;
    private String nomeProduto;
    private String sku;
    private String cor;
    private String tamanho;
}
