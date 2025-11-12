package com.frontalsneakers.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnderecoResponseDTO {
    private Long id;
    private String cep;
    private String rua;
    private String numero;
    private String cidade;
    private String estado;
}
