package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "challenge_name", length = 100)
    private String challengeName;

    @Column(name = "target_amount")
    private BigDecimal targetAmount;

    @Column(name = "saved_amount")
    private BigDecimal savedAmount;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "saving_cycle")
    private int savingCycle;

    @Column(name = "challenge_description", length = 500)
    private String challengeDescription;

    @Column(name = "challenge_status", length = 50)
    private String challengeStatus;

    @OneToOne(cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JoinColumn(name = "virtual_account_id", referencedColumnName = "id")
    private VirtualAccount virtualAccount;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;
}
