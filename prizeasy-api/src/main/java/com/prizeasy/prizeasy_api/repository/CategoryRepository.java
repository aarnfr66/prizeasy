package com.prizeasy.prizeasy_api.repository;

import com.prizeasy.prizeasy_api.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}