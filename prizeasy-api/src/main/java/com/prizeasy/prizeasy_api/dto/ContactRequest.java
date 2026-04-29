package com.prizeasy.prizeasy_api.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContactRequest {
    private String name;
    private String email;
    @Size(max = 1000, message = "El mensaje no puede superar los 1000 caracteres")
    private String message;
}
