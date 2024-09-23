package com.example.backend.service;

import com.example.backend.model.VirtualAccount;
import com.example.backend.repository.VirtualAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VirtualAccountService {
    private final VirtualAccountRepository virtualAccountRepository;

    public List<VirtualAccount> getAllVirtualAccount(){
        return virtualAccountRepository.findAll();
    }

    public void deleteVirtualAccountById(Long id){
        virtualAccountRepository.deleteById(id);
    }

}
