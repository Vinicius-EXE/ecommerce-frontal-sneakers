package com.frontalsneakers.api.service.impl;

import com.frontalsneakers.api.exception.ResourceNotFoundException;
import com.frontalsneakers.api.model.Endereco;
import com.frontalsneakers.api.model.Usuario;
import com.frontalsneakers.api.repository.EnderecoRepository;
import com.frontalsneakers.api.service.EnderecoService;
import com.frontalsneakers.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EndercoServiceImpl implements EnderecoService {

    @Autowired
    private final EnderecoRepository enderecoRepository;

    @Autowired
    private UsuarioService usuarioService;

    public EndercoServiceImpl(EnderecoRepository enderecoRepository) {
        this.enderecoRepository = enderecoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Endereco> findByUsuarioId(Long usuarioId) {
        Usuario usuario = usuarioService.findById(usuarioId);
        return usuario.getEnderecos();
    }

    @Override
    public Endereco findById(Long id) {
        return enderecoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado com id: " + id));
    }

    @Override
    @Transactional
    public Endereco create(Long usuarioId, Endereco endereco) {
        Usuario usuario = usuarioService.findById(usuarioId);
        endereco.setUsuario(usuario);
        return enderecoRepository.save(endereco);
    }

    @Override
    @Transactional
    public Endereco update(Long id, Endereco enderecoDetails) {
        Endereco existingEndereco = findById(id);

        existingEndereco.setCep(enderecoDetails.getCep());
        existingEndereco.setRua(enderecoDetails.getRua());
        existingEndereco.setNumero(enderecoDetails.getNumero());
        existingEndereco.setCidade(enderecoDetails.getCidade());
        existingEndereco.setEstado(enderecoDetails.getEstado());

        return enderecoRepository.save(existingEndereco);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Endereco endereco = findById(id);
        enderecoRepository.delete(endereco);
    }
}
