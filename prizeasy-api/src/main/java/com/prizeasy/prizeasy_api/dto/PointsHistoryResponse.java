package com.prizeasy.prizeasy_api.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PointsHistoryResponse {
    private Integer points;
    private String type;
    private String description;
    private LocalDateTime createdAt;

    // (clave para ADMIN)
    private String userEmail;
}