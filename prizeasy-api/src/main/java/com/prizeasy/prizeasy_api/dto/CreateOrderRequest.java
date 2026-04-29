package com.prizeasy.prizeasy_api.dto;

import java.util.List;

import lombok.Data;

@Data
public class CreateOrderRequest {

    private Integer userId;

    private List<OrderItemRequest> items;
}
