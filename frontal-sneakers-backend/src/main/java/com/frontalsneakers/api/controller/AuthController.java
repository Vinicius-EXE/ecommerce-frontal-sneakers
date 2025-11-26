package com.frontalsneakers.api.controller;

import com.frontalsneakers.api.dto.AuthDtos;
import com.frontalsneakers.api.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/signup")
    public ResponseEntity<AuthDtos.AuthenticationResponse> register(
            @RequestBody AuthDtos.RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthDtos.AuthenticationResponse> authenticate(
            @RequestBody AuthDtos.LoginRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
