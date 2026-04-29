package com.prizeasy.prizeasy_api.controller;

import com.prizeasy.prizeasy_api.dto.ContactRequest;
import com.prizeasy.prizeasy_api.entity.ContactMessage;
import com.prizeasy.prizeasy_api.entity.Product;
import com.prizeasy.prizeasy_api.service.ContactService;
import com.prizeasy.prizeasy_api.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
public class ContactMessageController {

    private final ContactService contactService;


    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void sendMessage( @Valid @RequestBody ContactRequest request) {
        contactService.sendMessage(request);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ContactMessage> getAllMessages() {
        return contactService.getAllMessages();
    }
}
