package com.frontalsneakers.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class CarrinhoResponseDTO {
    private Long id;
    private Long usuarioId;
    private List<ItemCarrinhoResponseDTO> itens;
    private BigDecimal subtotal;
}
