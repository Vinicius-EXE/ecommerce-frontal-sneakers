package com.frontalsneakers.api.service.impl;

import com.frontalsneakers.api.exception.ResourceNotFoundException;
import com.frontalsneakers.api.model.Carrinho;
import com.frontalsneakers.api.model.Role;
import com.frontalsneakers.api.model.Usuario;
import com.frontalsneakers.api.repository.CarrinhoRepository;
import com.frontalsneakers.api.repository.RoleRepository;
import com.frontalsneakers.api.repository.UsuarioRepository;
import com.frontalsneakers.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Injetado do SecurityConfig

    @Override
    public Usuario findById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com id: " + id));
    }

    @Override
    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com email: " + email));
    }

    @Override
    @Transactional // Garante que tudo (usuário + carrinho) seja salvo, ou nada é
    public Usuario createUsuario(String nome, String email, String senha, String cpf) {
        // Criptografar a senha
        String senhaHash = passwordEncoder.encode(senha);

        // Buscar a Role "ROLE_USER" (você precisará criar um script para inserir isso no banco)
        Role userRole = roleRepository.findByNome("ROLE_USER")
                .orElseThrow(() -> new ResourceNotFoundException("Role ROLE_USER não encontrada"));

        // Criar o novo usuário
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(nome);
        novoUsuario.setEmail(email);
        novoUsuario.setSenha(senhaHash);
        novoUsuario.setCpf(cpf);
        novoUsuario.setRoles(List.of(userRole));

        // Salvar o usuário (necessário para ter o ID)
        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);

        // Criar um carrinho vazio para ele
        Carrinho novoCarrinho = new Carrinho();
        novoCarrinho.setUsuario(usuarioSalvo);

        // Salvar o carrinho
        carrinhoRepository.save(novoCarrinho);

        // Atualizar a referência no usuário (JPA gerencia isso)
        usuarioSalvo.setCarrinho(novoCarrinho);

        return usuarioSalvo;
    }
}
