package com.prizeasy.prizeasy_api.controller;


import com.prizeasy.prizeasy_api.dto.PointsHistoryResponse;
import com.prizeasy.prizeasy_api.dto.PointsRequest;
import com.prizeasy.prizeasy_api.service.PointsHistoryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/points")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class PointsHistoryController {

    private final PointsHistoryService pointsHistoryService;

    @GetMapping("/my-points")
    @PreAuthorize("hasRole('USER')")
    public List<PointsHistoryResponse> getMyPointsHistory() {
        return pointsHistoryService.getMyPointsHistory();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<PointsHistoryResponse> getAllPointsHistory() {
        return pointsHistoryService.getAllPointsHistory();
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public void addPoints(@RequestBody PointsRequest request) {
        pointsHistoryService.addPoints(request);
    }

    @PostMapping("/deduct")
    @PreAuthorize("hasRole('ADMIN')")
    public void deductPoints(@RequestBody PointsRequest request) {
        pointsHistoryService.deductPoints(request);
    }
}
