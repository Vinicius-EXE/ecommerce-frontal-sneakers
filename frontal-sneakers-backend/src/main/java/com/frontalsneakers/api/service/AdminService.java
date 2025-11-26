package com.frontalsneakers.api.service;

import com.frontalsneakers.api.dto.UserDtos;
import com.frontalsneakers.api.model.Role;
import com.frontalsneakers.api.model.User;
import com.frontalsneakers.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;

    public List<UserDtos.AdminUserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public UserDtos.AdminUserDto updateUserRole(Long id, String roleName) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        try {
            Role role = Role.valueOf(roleName);
            user.setRole(role);
            return mapToDto(userRepository.save(user));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + roleName);
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private UserDtos.AdminUserDto mapToDto(User user) {
        return UserDtos.AdminUserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .isAdmin(user.getRole() == Role.ADMIN)
                .build();
    }
}
