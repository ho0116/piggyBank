package com.example.backend.service;

import com.example.backend.dto.ChallengeDto;
import com.example.backend.model.Account;
import com.example.backend.model.Challenge;
import com.example.backend.model.User;
import com.example.backend.model.VirtualAccount;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.ChallengeRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.VirtualAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final VirtualAccountRepository virtualAccountRepository;
    private final AccountRepository accountRepository;

//    public List<Challenge> getAllChallenges() {
//        return challengeRepository.findAll();
//    }

    public List<Challenge> getAllChallengesById(Long userId){
//        System.out.print(userId);
        return challengeRepository.findAllByUser_Id(userId);
    }

    public Challenge getChallenge(Long id){
        return challengeRepository.findById(id).orElse(null);
    }

    public Challenge createChallenge(ChallengeDto challengeDto) {
        User user = userRepository.findById(challengeDto.getUserId())
                .orElse(null);

        Challenge challenge = new Challenge();
        challenge.setChallengeName(challengeDto.getChallengeName());
        challenge.setChallengeDescription(challengeDto.getChallengeDescription());
        challenge.setChallengeStatus("In Progress");
        challenge.setStartDate(challengeDto.getStartDate());
        challenge.setEndDate(challengeDto.getEndDate());
        challenge.setSavingCycle(challengeDto.getSavingCycle());
        challenge.setTargetAmount(challengeDto.getTargetAmount());
        challenge.setSavedAmount(BigDecimal.ZERO);
        challenge.setUser(user);
        challenge.setAmount(challengeDto.getAmount());

        Account account = accountRepository.findById(challengeDto.getAccountId())
                .orElse(null);
        challenge.setAccount(account);

        challenge = challengeRepository.save(challenge);

        VirtualAccount virtualAccount = new VirtualAccount();
        virtualAccount.setAccountNumber(generateRandomAccountNumber());  // 랜덤 가상 계좌 번호 생성
        virtualAccount.setChallenge(challenge);  // VirtualAccount에 Challenge 연결
        virtualAccount.setBalance(BigDecimal.ZERO);

        virtualAccount = virtualAccountRepository.save(virtualAccount);

        challenge.setVirtualAccount(virtualAccount);
        return challengeRepository.save(challenge);

    }

    private String generateRandomAccountNumber() {
        Random random = new Random();
        StringBuilder accountNumber = new StringBuilder();
        for (int i = 0; i < 12; i++) {  // 12자리 숫자로 구성된 가상 계좌 번호 생성
            accountNumber.append(random.nextInt(10));  // 0~9 사이의 숫자 랜덤 생성
        }
        return accountNumber.toString();
    }

    public Challenge updateChallenge(Long id, ChallengeDto challengeDto) {
        Optional<Challenge> existingChallenge = challengeRepository.findById(id);

        if (existingChallenge.isPresent()) {
            Challenge updatedChallenge = existingChallenge.get();
            updatedChallenge.setChallengeName(challengeDto.getChallengeName());
            updatedChallenge.setChallengeDescription(challengeDto.getChallengeDescription());
            updatedChallenge.setChallengeStatus(challengeDto.getChallengeStatus());
            updatedChallenge.setEndDate(challengeDto.getEndDate());
            updatedChallenge.setSavingCycle(challengeDto.getSavingCycle());
            updatedChallenge.setTargetAmount(challengeDto.getTargetAmount());
            updatedChallenge.setAmount(challengeDto.getAmount());
//            updatedChallenge.setSavedAmount(challengeDto.getSavedAmount());

            return challengeRepository.save(updatedChallenge);
        } else {
            return createChallenge(challengeDto);
        }
    }

    public void deleteChallenge(Long id){
        challengeRepository.deleteById(id);
    }
}
