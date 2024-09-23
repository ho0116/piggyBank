package com.example.backend.controller;

import com.example.backend.dto.AccountDto;
import com.example.backend.model.Account;
import com.example.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class AccountController {

    private final AccountService accountService;

    @GetMapping
    public List<Account> getAllAccount() {
        return accountService.getAllAccount();
    }

    @GetMapping("/{id}")
    public Account getAccount(@PathVariable Long id) {
        return accountService.getAccount(id);
    }

    @PostMapping
    public Account createAccount(@RequestBody AccountDto accountDto) {
        return accountService.createAccount(accountDto);
    }

    @PutMapping
    public Account updateAccount(@RequestBody AccountDto accountDto) {
        return accountService.updateAccount(accountDto);
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable Long id) {
        accountService.deleteAccount(id);
    }


}
