package com.frontalsneakers.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cardNumber; // Masked or encrypted in real app
    private String holderName;
    private String expiryDate;
    private String cvv; // Usually not stored, but requested for this demo
    private String holderCpf;
    private String nickname;
    private String lastDigits;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
