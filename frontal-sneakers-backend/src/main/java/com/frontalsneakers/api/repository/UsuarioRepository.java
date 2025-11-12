package com.frontalsneakers.api.repository;

import com.frontalsneakers.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email); // Busca usuário pelo Email
    Optional<Usuario> findByCpf(String cpf); // Busca usuário pelo CPF
}
