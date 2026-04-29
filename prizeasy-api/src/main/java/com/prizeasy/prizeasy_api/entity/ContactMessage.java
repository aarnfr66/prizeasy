package com.prizeasy.prizeasy_api.entity;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@Table(name = "contact_messages")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String email;

    @Column(length = 1000)
    @Size(max = 1000, message = "El mensaje no puede superar los 1000 caracteres")
    private String message;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public ContactMessage() {}
}