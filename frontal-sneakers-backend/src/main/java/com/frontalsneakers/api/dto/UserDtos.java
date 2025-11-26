package com.frontalsneakers.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class UserDtos {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserProfileDto {
        private String name;
        private String email;
        private String nickname;
        private String cpf;
        private String phone;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CardDto {
        private Long id;
        private String cardNumber;
        private String holderName;
        private String expiryDate;
        private String cvv;
        private String holderCpf;
        private String nickname;
        private String lastDigits;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AddressDto {
        private Long id;
        private String cep;
        private String street;
        private String number;
        private String neighborhood;
        private String complement;
        private String reference;
        private String type;
        private String contactName;
        private String contactPhone;
        private String nickname;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PasswordUpdateDto {
        private String currentPassword;
        private String newPassword;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AdminUserDto {
        private Long id;
        private String name;
        private String email;
        private String nickname;
        private boolean isAdmin;
    }
}
