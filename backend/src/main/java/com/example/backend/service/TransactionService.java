package com.example.backend.service;

import com.example.backend.dto.TransactionDto;
import com.example.backend.model.Account;
import com.example.backend.model.Challenge;
import com.example.backend.model.Transaction;
import com.example.backend.model.VirtualAccount;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.ChallengeRepository;
import com.example.backend.repository.TransactionRepository;
import com.example.backend.repository.VirtualAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final VirtualAccountRepository virtualAccountRepository;
    private final AccountRepository accountRepository;
    private final ChallengeRepository challengeRepository;

    public Transaction createTransaction(TransactionDto transactionDto) {
        System.out.println(transactionDto.getVirtualAccountId());
        VirtualAccount virtualAccount = virtualAccountRepository.findById(transactionDto.getVirtualAccountId())
                .orElseThrow(() -> new RuntimeException("Virtual account not found"));

        Challenge challenge = virtualAccount.getChallenge();

        if (!"In Progress".equalsIgnoreCase(challenge.getChallengeStatus())) {
            throw new RuntimeException("Transactions are only allowed when the challenge is in progress.");
        }

        BigDecimal amount = transactionDto.getAmount();

        // 계좌에서 출금
        Account account = virtualAccount.getChallenge().getAccount();

        if (account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("잔액 부족");
        }

        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);

        //가상계좌 입급
        BigDecimal newSavedAmount = challenge.getSavedAmount().add(amount);

        virtualAccount.setBalance(virtualAccount.getBalance().add(amount));
        challenge.setSavedAmount(newSavedAmount);

        if (newSavedAmount.compareTo(challenge.getTargetAmount()) >= 0) {
            challenge.setChallengeStatus("Completed");
        }

        virtualAccountRepository.save(virtualAccount);
        challengeRepository.save(challenge);

        Transaction transaction = new Transaction();
        transaction.setVirtualAccount(virtualAccount);
        transaction.setTransactionType("Deposit");
        transaction.setAmount(amount);
        transaction.setTransactionDate(LocalDate.now());
        transaction.setTransactionDescription(transactionDto.getDescription());

        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

}
