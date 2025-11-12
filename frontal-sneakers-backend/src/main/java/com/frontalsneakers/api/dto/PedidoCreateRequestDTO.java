package com.frontalsneakers.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoCreateRequestDTO {
    @NotNull(message = "ID do Endereço de Entrega é obrigatório")
    private Long enderecoEntregaId;
}
