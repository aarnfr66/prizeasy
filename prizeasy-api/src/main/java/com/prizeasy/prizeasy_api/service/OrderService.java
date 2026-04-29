package com.prizeasy.prizeasy_api.service;

import com.prizeasy.prizeasy_api.dto.CreateOrderRequest;
import com.prizeasy.prizeasy_api.dto.OrderDetailResponse;
import com.prizeasy.prizeasy_api.dto.OrderItemRequest;
import com.prizeasy.prizeasy_api.dto.OrderResponse;
import com.prizeasy.prizeasy_api.entity.*;
import com.prizeasy.prizeasy_api.enums.TransactionType;
import com.prizeasy.prizeasy_api.exception.PointsInsufficientException;
import com.prizeasy.prizeasy_api.exception.ResourceNotFoundException;
import com.prizeasy.prizeasy_api.exception.StockInsufficientException;
import com.prizeasy.prizeasy_api.exception.UserNotFoundException;
import com.prizeasy.prizeasy_api.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.prizeasy.prizeasy_api.enums.OrderStatus;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final PointsTransactionRepository pointsTransactionRepository;



    @Transactional
    public Order createOrder(CreateOrderRequest request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        int totalPoints = 0;

        //  Primero validamos y calculamos
        for (OrderItemRequest item : request.getItems()) {

            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

            if (product.getStock() < item.getQuantity()) {
                throw new StockInsufficientException("Stock insuficiente para " + product.getName());
            }

            totalPoints += product.getPointsCost() * item.getQuantity();
        }

        //  Validar puntos antes de guardar nada
        if (user.getPoints() < totalPoints) {
            throw new PointsInsufficientException("Puntos insuficientes");
        }

        //  Crear order UNA SOLA VEZ
        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.COMPLETED);
        order.setTotalPoints(totalPoints);

        order = orderRepository.save(order);

        //  Crear detalles + actualizar stock
        for (OrderItemRequest item : request.getItems()) {

            Product product = productRepository.findById(item.getProductId())
            .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

            OrderDetail detail = new OrderDetail();
            detail.setOrder(order);
            detail.setProduct(product);
            detail.setQuantity(item.getQuantity());
            detail.setPointsCost(product.getPointsCost());

            orderDetailRepository.save(detail);

            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
        }

        //  Descontar puntos
        user.setPoints(user.getPoints() - totalPoints);
        userRepository.save(user);

        //  Registrar transacción
        PointsTransaction tx = new PointsTransaction();
        tx.setUser(user);
        tx.setPoints(-totalPoints);
        tx.setType(TransactionType.REDEEM);
        tx.setDescription("Canje de productos - Order #" + order.getId());

        pointsTransactionRepository.save(tx);

        return order;
    }

    private OrderResponse mapToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setTotalPoints(order.getTotalPoints());
        response.setStatus(order.getStatus().name());
        response.setUserEmail(order.getUser().getEmail());
        response.setCreatedAt(order.getCreatedAt());


        List<OrderDetailResponse> details = order.getDetails().stream().map(d -> {
            OrderDetailResponse detail = new OrderDetailResponse();
            detail.setProductName(d.getProduct().getName());
            detail.setQuantity(d.getQuantity());
            detail.setPointsCost(d.getPointsCost());
            return detail;
        }).toList();

        response.setDetails(details);

        return response;
    }

    public List<OrderResponse> getOrdersByUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        return orderRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public OrderResponse getOrderById(Integer id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        return mapToResponse(order);
    }
}