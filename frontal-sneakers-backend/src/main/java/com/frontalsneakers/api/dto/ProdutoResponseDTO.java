package com.frontalsneakers.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProdutoResponseDTO {
    private Long id;
    private String nome;
    private String descricao;
    private String slug;
    private String marcaNome;
    private List<String> categoriasNomes; // Lista de nomes
    private List<VariacaoProdutoResponseDTO> variacoes;
}
