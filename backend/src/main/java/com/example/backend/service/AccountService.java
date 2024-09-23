package com.example.backend.service;

import com.example.backend.dto.AccountDto;
import com.example.backend.model.Account;
import com.example.backend.model.User;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public List<Account> getAllAccount(){
        return accountRepository.findAll();
    }

    public Account getAccount(Long id){
        return accountRepository.findById(id).orElse(null);
    }

    public Account createAccount(AccountDto accountDto){

//        System.out.printf(accountRequest.getUser().ge);
        User user = userRepository.findById(accountDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = new Account();
        account.setBankName(accountDto.getBankName());
        account.setAccountNumber(accountDto.getAccountNumber());
        account.setAccountHolder(accountDto.getAccountHolder());
        account.setBalance(accountDto.getBalance());
        account.setUser(user);

        Account savedAccount = accountRepository.save(account);

        return savedAccount;
    }

    public Account updateAccount(AccountDto accountDto){
        Optional<Account> existingAccount = accountRepository.findById(accountDto.getId());

        if (existingAccount.isPresent()) {
            Account updatedAccount = existingAccount.get();
            updatedAccount.setAccountNumber(accountDto.getAccountNumber());
            updatedAccount.setAccountHolder(accountDto.getAccountHolder());
            updatedAccount.setBankName(accountDto.getBankName());
            updatedAccount.setBalance(accountDto.getBalance());
            return accountRepository.save(updatedAccount);
        } else {
            return createAccount(accountDto);
        }
    }

    public void deleteAccount(Long id){
        accountRepository.deleteById(id);
    }
}
