package com.frontalsneakers.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDtos {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderDto {
        private Long id;
        private Long userId;
        private String customerName;
        private LocalDateTime date;
        private Double total;
        private String status;
        private List<OrderItemDto> items;
        private String address;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemDto {
        private String productName;
        private Integer quantity;
        private Double price;
        private String size; // Assuming product size is relevant here
    }
}
