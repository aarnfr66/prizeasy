package com.prizeasy.prizeasy_api.exception;

public class PointsInsufficientException extends RuntimeException {
    public PointsInsufficientException(String message) {
        super(message);
    }
}