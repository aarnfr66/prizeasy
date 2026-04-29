package com.prizeasy.prizeasy_api.repository;

import com.prizeasy.prizeasy_api.entity.PointsTransaction;
import com.prizeasy.prizeasy_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointsTransactionRepository extends JpaRepository<PointsTransaction, Integer> {
    List<PointsTransaction> findByUser(User user);

}