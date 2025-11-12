package com.frontalsneakers.api.service;

import com.frontalsneakers.api.model.Usuario;

public interface UsuarioService {
    Usuario findById(Long id);

    Usuario findByEmail(String email);

    Usuario createUsuario(String nome, String email, String senha, String cpf);
}
