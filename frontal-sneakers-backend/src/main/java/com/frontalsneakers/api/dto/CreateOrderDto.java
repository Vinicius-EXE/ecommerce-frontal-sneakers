package com.frontalsneakers.api.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateOrderDto {
    private AddressDto address;
    private PaymentDto payment;
    private List<OrderItemDto> items;
    private Double total;

    @Data
    public static class AddressDto {
        private String cep;
        private String street;
        private String number;
        private String complement;
        private String city;
        private String state;
        private String type;
    }

    @Data
    public static class PaymentDto {
        private String method;
        private String cardNumber;
        private String cardName;
        private String cardExpiry;
        private String cardCvv;
        private String cpf;
    }

    @Data
    public static class OrderItemDto {
        private Long productId;
        private Integer quantity;
        private Double price;
    }
}
