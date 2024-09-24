package com.example.backend.dto;

import lombok.Data;

import java.math.BigDecimal;


@Data
public class AccountDto {
    private String bankName;
    private String accountNumber;
    private String accountHolder;
    private BigDecimal balance;
    private Long userId;

}
