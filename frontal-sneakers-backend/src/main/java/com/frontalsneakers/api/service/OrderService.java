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

    private final com.frontalsneakers.api.repository.OrderRepository orderRepository;
    private final com.frontalsneakers.api.repository.ProductRepository productRepository;
    private final com.frontalsneakers.api.repository.UserRepository userRepository;

    public OrderDtos.OrderDto createOrder(com.frontalsneakers.api.dto.CreateOrderDto createOrderDto, String userEmail) {
        com.frontalsneakers.api.model.User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setDate(java.time.LocalDateTime.now());
        order.setTotal(createOrderDto.getTotal());
        order.setStatus("PAGAMENTO APROVADO"); // Simulating payment approval
        order.setAddress(formatAddress(createOrderDto.getAddress()));

        List<com.frontalsneakers.api.model.OrderItem> items = createOrderDto.getItems().stream().map(itemDto -> {
            com.frontalsneakers.api.model.Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            com.frontalsneakers.api.model.OrderItem orderItem = new com.frontalsneakers.api.model.OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setPrice(itemDto.getPrice());
            return orderItem;
        }).collect(Collectors.toList());

        order.setItems(items);

        return mapToDto(orderRepository.save(order));
    }

    public List<OrderDtos.OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<OrderDtos.OrderDto> getUserOrders(String userEmail) {
        com.frontalsneakers.api.model.User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public OrderDtos.OrderDto updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return mapToDto(orderRepository.save(order));
    }

    private String formatAddress(com.frontalsneakers.api.dto.CreateOrderDto.AddressDto addressDto) {
        return String.format("%s, %s - %s, %s - %s, %s",
                addressDto.getStreet(), addressDto.getNumber(), addressDto.getComplement(),
                addressDto.getCity(), addressDto.getState(), addressDto.getCep());
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
