package com.frontalsneakers.api.repository;

import com.frontalsneakers.api.model.Pedido;
import com.frontalsneakers.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuario(Usuario usuario); // Busca TODOS os Pedidos de um Usuário específico
}
