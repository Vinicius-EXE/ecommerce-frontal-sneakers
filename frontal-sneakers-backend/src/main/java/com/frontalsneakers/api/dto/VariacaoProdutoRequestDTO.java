package com.frontalsneakers.api.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class VariacaoProdutoRequestDTO {

    @NotBlank(message = "SKU é obrigatório")
    private String sku;

    @NotBlank(message = "Cor é obrigatória")
    private String cor;

    @NotBlank(message = "Tamanho é obrigatório")
    private String tamanho;

    @NotNull(message = "Preço é obrigatório")
    @Positive(message = "Preço deve ser positivo")
    private BigDecimal preco;

    @NotNull(message = "Quantidade em estoque é obrigatória")
    @Min(value = 0, message = "Estoque não pode ser negativo")
    private Integer quantidadeEstoque;

    private List<String> imagens;
}