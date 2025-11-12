package com.frontalsneakers.api.repository;

import com.frontalsneakers.api.model.VariacaoProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VariacaoProdutoRepository  extends JpaRepository<VariacaoProduto, Long> {
    Optional<VariacaoProduto> findBySku(String sku); // Busca uma Variação de Produto pelo Sku (Código único de estoque, Ex: "AJ1-RED-40")
}
