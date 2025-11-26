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
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cep;
    private String street;
    private String number;
    private String neighborhood;
    private String complement;
    private String reference;
    private String type; // home or work
    private String contactName;
    private String contactPhone;
    private String nickname;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
