package com.prizeasy.prizeasy_api.dto;

import lombok.Data;

@Data
public class UserResponse {
    private Integer id;
    private String name;
    private String email;
    private String dni;
    private Integer points;
    private String role;
}