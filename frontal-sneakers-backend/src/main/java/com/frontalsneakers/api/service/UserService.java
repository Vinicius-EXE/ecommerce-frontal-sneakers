package com.frontalsneakers.api.service;

import com.frontalsneakers.api.dto.UserDtos;
import com.frontalsneakers.api.model.User;
import com.frontalsneakers.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public UserDtos.UserProfileDto getUserProfile() {
        User user = getCurrentUser();
        return UserDtos.UserProfileDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .cpf(user.getCpf())
                .phone(user.getPhone())
                .build();
    }

    public UserDtos.UserProfileDto updateUserProfile(UserDtos.UserProfileDto dto) {
        User user = getCurrentUser();
        user.setName(dto.getName());
        user.setNickname(dto.getNickname());
        user.setCpf(dto.getCpf());
        user.setPhone(dto.getPhone());
        userRepository.save(user);
        return dto;
    }

    public void updatePassword(UserDtos.PasswordUpdateDto dto) {
        User user = getCurrentUser();
        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Incorrect current password");
        }
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
    }
}
