package com.frontalsneakers.api.repository;

import com.frontalsneakers.api.model.Carrinho;
import com.frontalsneakers.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    Optional<Carrinho> findByUsuario(Usuario usuario); // Busca um Carrinho pelo seu Usuário
}
