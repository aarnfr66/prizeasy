package com.prizeasy.prizeasy_api.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
public class OrderResponse {
    private Integer id;
    private Integer totalPoints;
    private String status;
    private String userEmail;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
    private List<OrderDetailResponse> details;
}