package com.prizeasy.prizeasy_api.repository;

import com.prizeasy.prizeasy_api.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}