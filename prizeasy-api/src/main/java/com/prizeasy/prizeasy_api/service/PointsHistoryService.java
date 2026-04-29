package com.prizeasy.prizeasy_api.service;

import com.prizeasy.prizeasy_api.dto.PointsHistoryResponse;
import com.prizeasy.prizeasy_api.dto.PointsRequest;
import com.prizeasy.prizeasy_api.entity.PointsTransaction;
import com.prizeasy.prizeasy_api.entity.User;
import com.prizeasy.prizeasy_api.enums.TransactionType;
import com.prizeasy.prizeasy_api.exception.UserNotFoundException;
import com.prizeasy.prizeasy_api.repository.PointsTransactionRepository;
import com.prizeasy.prizeasy_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PointsHistoryService {

    private final PointsTransactionRepository pointsTransactionRepository;
    private final UserRepository userRepository;


    public List<PointsHistoryResponse> getMyPointsHistory() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        return pointsTransactionRepository.findByUser(user)
                .stream()
                .map(tx -> {
                    PointsHistoryResponse res = new PointsHistoryResponse();
                    res.setPoints(tx.getPoints());
                    res.setType(tx.getType().name());
                    res.setDescription(tx.getDescription());
                    res.setCreatedAt(tx.getCreatedAt());
                    return res;
                })
                .toList();
    }

    public List<PointsHistoryResponse> getAllPointsHistory() {
        return pointsTransactionRepository.findAll()
                .stream()
                .map(tx -> {
                    PointsHistoryResponse res = new PointsHistoryResponse();
                    res.setPoints(tx.getPoints());
                    res.setType(tx.getType().name());
                    res.setDescription(tx.getDescription());
                    res.setCreatedAt(tx.getCreatedAt());

                    //  importante
                    res.setUserEmail(tx.getUser().getEmail());

                    return res;
                })
                .toList();
    }

    public void addPoints(PointsRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        //  actualizar puntos del usuario
        user.setPoints(user.getPoints() + request.getPoints());
        userRepository.save(user);

        // guardar historial
        PointsTransaction tx = new PointsTransaction();
        tx.setUser(user);
        tx.setPoints(request.getPoints());
        tx.setType(TransactionType.EARN);
        tx.setDescription(request.getDescription());
        tx.setCreatedAt(LocalDateTime.now());

        pointsTransactionRepository.save(tx);
    }

    public void deductPoints(PointsRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        //  validación importante
        if (user.getPoints() < request.getPoints()) {
            throw new RuntimeException("Puntos insuficientes");
        }

        user.setPoints(user.getPoints() - request.getPoints());
        userRepository.save(user);

        PointsTransaction tx = new PointsTransaction();
        tx.setUser(user);
        tx.setPoints(-request.getPoints()); //  negativo
        tx.setType(TransactionType.REDEEM);
        tx.setDescription(request.getDescription());
        tx.setCreatedAt(LocalDateTime.now());

        pointsTransactionRepository.save(tx);
    }
}
