package com.prizeasy.prizeasy_api.dto;

import lombok.Data;

@Data
public class UserRequest {
    private String name;
    private String email;
    private String dni;
    private String password;
    private Integer roleId;
}