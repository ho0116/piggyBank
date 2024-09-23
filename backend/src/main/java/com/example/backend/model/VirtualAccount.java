package com.example.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
public class VirtualAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "challenge_id", referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private Challenge challenge;

    @Column(name = "account_number", length = 100, unique = true, nullable = false)
    private String accountNumber;

    @Column(name = "balance")
    private BigDecimal balance;
}
