package com.frontalsneakers.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseDTO {
    private String token; // O JSON Web Token
    private Long usuarioId;
    private String nomeUsuario;
    private List<String> roles;
}
