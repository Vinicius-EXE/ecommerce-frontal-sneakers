package com.frontalsneakers.api.repository;

import com.frontalsneakers.api.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(com.frontalsneakers.api.model.User user);
}
