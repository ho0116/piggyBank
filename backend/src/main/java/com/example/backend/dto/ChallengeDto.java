package com.example.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ChallengeDto {
    private Long id;
    private String challengeName;
    private BigDecimal targetAmount;
    private BigDecimal savedAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private int savingCycle;
    private String challengeDescription;
    private String challengeStatus;
    private Long userId;


}
