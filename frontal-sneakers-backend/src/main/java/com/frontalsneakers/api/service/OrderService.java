package com.frontalsneakers.api.service;

import com.frontalsneakers.api.dto.OrderDtos;
import com.frontalsneakers.api.model.Order;
import com.frontalsneakers.api.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<OrderDtos.OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public OrderDtos.OrderDto updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return mapToDto(orderRepository.save(order));
    }

    private OrderDtos.OrderDto mapToDto(Order order) {
        return OrderDtos.OrderDto.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .customerName(order.getUser().getName())
                .date(order.getDate())
                .total(order.getTotal())
                .status(order.getStatus())
                .address(order.getAddress())
                .items(order.getItems().stream().map(item -> OrderDtos.OrderItemDto.builder()
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .build()).collect(Collectors.toList()))
                .build();
    }
}
