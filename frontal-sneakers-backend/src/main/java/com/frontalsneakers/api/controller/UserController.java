package com.frontalsneakers.api.controller;

import com.frontalsneakers.api.dto.UserDtos;
import com.frontalsneakers.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDtos.UserProfileDto> getProfile() {
        return ResponseEntity.ok(userService.getUserProfile());
    }

    @PutMapping("/me")
    public ResponseEntity<UserDtos.UserProfileDto> updateProfile(@RequestBody UserDtos.UserProfileDto dto) {
        return ResponseEntity.ok(userService.updateUserProfile(dto));
    }

    @PutMapping("/me/password")
    public ResponseEntity<Void> updatePassword(@RequestBody UserDtos.PasswordUpdateDto dto) {
        userService.updatePassword(dto);
        return ResponseEntity.ok().build();
    }
}
