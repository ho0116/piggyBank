package com.example.backend.controller;

import com.example.backend.dto.TransactionDto;
import com.example.backend.model.Transaction;
import com.example.backend.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionDto transactionDto) {

        Transaction transaction = transactionService.createTransaction(transactionDto);
        return ResponseEntity.ok(transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
    }
}
