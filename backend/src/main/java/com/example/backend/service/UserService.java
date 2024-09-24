package com.example.backend.service;

import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public User getUser(UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        if (!user.getPassword().equals(userDto.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        return user;
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        Optional<User> existingUser = userRepository.findById(user.getId());

        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setUsername(user.getUsername());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setEmail(user.getEmail());
            return userRepository.save(updatedUser);
        } else {
            return userRepository.save(user);
        }
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

}
