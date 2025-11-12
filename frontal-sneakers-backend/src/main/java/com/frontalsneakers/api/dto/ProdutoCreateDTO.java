package com.frontalsneakers.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProdutoCreateDTO {

    @NotBlank
    private String nome;

    @NotBlank
    private String descricao;

    @NotNull(message = "ID da Marca é obrigatório")
    private Long marcaId;

    @NotNull
    @Size(min = 1, message = "Produto deve ter ao menos uma categoria")
    private List<Long> categoriaIds; // Lista de IDs de categorias
}
