package com.frontalsneakers.api.controller;

import com.frontalsneakers.api.dto.OrderDtos;
import com.frontalsneakers.api.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDtos.OrderDto> createOrder(
            @RequestBody com.frontalsneakers.api.dto.CreateOrderDto createOrderDto) {
        // In a real app, get user email from SecurityContext
        // For now, assuming the DTO or a header might contain it, or hardcoding/mocking
        // for the prototype if auth isn't fully set up in the controller context yet.
        // However, the user is authenticated. Let's assume we can get the principal.
        // Since I don't want to overcomplicate with SecurityContextHolder right now,
        // I'll assume the frontend sends the user ID or email, OR I'll just use a
        // placeholder if not available.
        // Better: Use @AuthenticationPrincipal or SecurityContextHolder.
        // Let's use SecurityContextHolder.
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        return ResponseEntity.ok(orderService.createOrder(createOrderDto, email));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderDtos.OrderDto>> getUserOrders() {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        return ResponseEntity.ok(orderService.getUserOrders(email));
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderDtos.OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderDtos.OrderDto> updateOrderStatus(@PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
