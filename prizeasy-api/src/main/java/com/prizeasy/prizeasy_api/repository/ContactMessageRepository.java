package com.prizeasy.prizeasy_api.repository;

import com.prizeasy.prizeasy_api.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Integer> {
}
