package com.prizeasy.prizeasy_api.dto;

import lombok.Data;

@Data
public class OrderDetailResponse {
    private String productName;
    private Integer quantity;
    private Integer pointsCost;
}