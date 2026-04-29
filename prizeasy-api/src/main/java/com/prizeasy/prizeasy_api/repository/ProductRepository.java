package com.prizeasy.prizeasy_api.repository;

import com.prizeasy.prizeasy_api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}