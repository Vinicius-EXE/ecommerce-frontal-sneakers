package com.frontalsneakers.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MarcaRequestDTO {

    @NotBlank(message = "Nome é obrigatório")
    private String nome;
}
