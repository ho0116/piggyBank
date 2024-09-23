package com.example.backend.controller;

import com.example.backend.dto.ChallengeDto;
import com.example.backend.model.Challenge;
import com.example.backend.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {
    private final ChallengeService challengeService;

    @GetMapping
    public List<Challenge> getAllChallenges(){
        return challengeService.getAllChallenges();
    }

    @GetMapping("/{id}")
    public Challenge getChallenge(@PathVariable Long id){
        return challengeService.getChallenge(id);
    }

    @PostMapping
    public Challenge createChallenge(@RequestBody ChallengeDto challengeDto){
        return challengeService.createChallenge(challengeDto);
    }

    @PutMapping
    public Challenge updateChallenge(@RequestBody ChallengeDto challengeDto){
        return challengeService.updateChallenge(challengeDto);
    }

    @DeleteMapping("/{id}")
    public void deleteChallenge(@PathVariable Long id){
        challengeService.deleteChallenge(id);
    }
}
