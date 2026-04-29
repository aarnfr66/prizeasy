package com.prizeasy.prizeasy_api.dto;

import lombok.Data;

@Data
public class PointsRequest {
    private String email;
    private Integer points;
    private String description;
}