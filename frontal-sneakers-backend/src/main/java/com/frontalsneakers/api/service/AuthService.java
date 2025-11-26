package com.frontalsneakers.api.service;

import com.frontalsneakers.api.dto.AuthDtos;
import com.frontalsneakers.api.model.Role;
import com.frontalsneakers.api.model.User;
import com.frontalsneakers.api.repository.UserRepository;
import com.frontalsneakers.api.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtTokenProvider jwtTokenProvider;
        private final AuthenticationManager authenticationManager;

        public AuthDtos.AuthenticationResponse register(AuthDtos.RegisterRequest request) {
                var user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .build();
                userRepository.save(user);
                var jwtToken = jwtTokenProvider.generateToken(user);
                return AuthDtos.AuthenticationResponse.builder()
                                .token(jwtToken)
                                .role(user.getRole().name())
                                .build();
        }

        public AuthDtos.AuthenticationResponse authenticate(AuthDtos.LoginRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtTokenProvider.generateToken(user);
                return AuthDtos.AuthenticationResponse.builder()
                                .token(jwtToken)
                                .role(user.getRole().name())
                                .build();
        }
}
