package com.frontalsneakers.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class VariacaoProdutoResponseDTO {
    private Long id;
    private String sku;
    private String cor;
    private String tamanho;
    private BigDecimal preco;
    private Integer quantidadeEstoque;
    private List<String> imagens;
}
