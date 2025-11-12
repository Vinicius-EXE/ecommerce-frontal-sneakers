package com.frontalsneakers.api.repository;

import com.frontalsneakers.api.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProdutoRepository  extends JpaRepository<Produto, Long> {
    Optional<Produto> findBySlug(String slug); // Busca um produto pelo Slug (Url amigável, Ex: "air-jordan-1-high")
}
