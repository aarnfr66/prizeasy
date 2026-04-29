package com.prizeasy.prizeasy_api.service;

import com.prizeasy.prizeasy_api.dto.UserRequest;
import com.prizeasy.prizeasy_api.dto.UserResponse;
import com.prizeasy.prizeasy_api.entity.Role;
import com.prizeasy.prizeasy_api.entity.User;
import com.prizeasy.prizeasy_api.repository.RoleRepository;
import com.prizeasy.prizeasy_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserResponse> getAll() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public UserResponse getById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return mapToResponse(user);
    }

    public UserResponse create(UserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        if (userRepository.existsByDni(request.getDni())) {
            throw new RuntimeException("El DNI ya está registrado");
        }
        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setDni(request.getDni());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPoints(0);
        user.setRole(role);

        return mapToResponse(userRepository.save(user));
    }

    public UserResponse update(Integer id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setDni(request.getDni());
        user.setRole(role);

        //  solo si mandan password
        if (request.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return mapToResponse(userRepository.save(user));
    }

    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    //  mapper
    private UserResponse mapToResponse(User user) {
        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setDni(user.getDni());
        res.setPoints(user.getPoints());
        res.setRole(user.getRole().getName());
        return res;
    }

    public UserResponse getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user = (User) auth.getPrincipal();

        return mapToResponse(user);
    }
}