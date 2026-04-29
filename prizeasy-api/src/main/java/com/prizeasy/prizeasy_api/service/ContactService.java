package com.prizeasy.prizeasy_api.service;

import com.prizeasy.prizeasy_api.dto.ContactRequest;
import com.prizeasy.prizeasy_api.entity.ContactMessage;
import com.prizeasy.prizeasy_api.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactMessageRepository contactMessageRepository;

    public void sendMessage(ContactRequest request) {
        ContactMessage msg = new ContactMessage();

        msg.setName(request.getName());
        msg.setEmail(request.getEmail());
        msg.setMessage(request.getMessage());
        msg.setCreatedAt(LocalDateTime.now());

        contactMessageRepository.save(msg);
    }

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }
}
