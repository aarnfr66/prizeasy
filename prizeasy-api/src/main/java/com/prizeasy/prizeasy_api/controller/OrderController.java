package com.prizeasy.prizeasy_api.controller;

import com.prizeasy.prizeasy_api.dto.CreateOrderRequest;
import com.prizeasy.prizeasy_api.dto.OrderResponse;
import com.prizeasy.prizeasy_api.entity.Order;
import com.prizeasy.prizeasy_api.service.OrderService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class OrderController {

    private final OrderService orderService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<Order> create(@RequestBody @Valid CreateOrderRequest request) {
        return ResponseEntity.ok(orderService.createOrder(request));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/my-orders")
    public List<OrderResponse> getMyOrders() {
        return orderService.getOrdersByUser();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public OrderResponse getOrderById(@PathVariable Integer id) {
        return orderService.getOrderById(id);
    }
}