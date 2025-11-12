package com.frontalsneakers.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ItemCarrinhoResponseDTO {
    private Long itemCarrinhoId;
    private Long variacaoProdutoId;
    private String nomeProduto;
    private String sku;
    private String cor;
    private String tamanho;
    private String imagemCapa;
    private BigDecimal precoUnitario;
    private Integer quantidade;
    private BigDecimal precoTotalItem;
}
