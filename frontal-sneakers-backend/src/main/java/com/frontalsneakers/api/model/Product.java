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
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private String sizes; // Storing as comma-separated string for simplicity
    private Integer quantity;

    @Column(length = 1000)
    private String description;

    private String brand;
    private String images; // Storing as comma-separated string or single URL
}
