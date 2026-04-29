package com.prizeasy.prizeasy_api.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    private String description;

    @Min(value = 1, message = "El costo en puntos debe ser mayor a 0")
    @Column(name = "points_cost")
    private Integer pointsCost;

    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    @Column(name = "image_url")
    private String imageUrl;

    private Boolean active=true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.active == null) {
            this.active = true;
        }
    }

}