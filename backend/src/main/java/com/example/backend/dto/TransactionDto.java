package com.example.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransactionDto {
    private Long virtualAccountId;
    private BigDecimal amount;
    private String description;
}
