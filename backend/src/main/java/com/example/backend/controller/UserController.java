package com.example.backend.controller;

import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public User getUser(@RequestBody UserDto userDto) {
        return userService.getUser(userDto);
    }

    @PostMapping("/join")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping
    public void deleteUser(@RequestParam Long id) {
        userService.deleteUser(id);
    }
}
