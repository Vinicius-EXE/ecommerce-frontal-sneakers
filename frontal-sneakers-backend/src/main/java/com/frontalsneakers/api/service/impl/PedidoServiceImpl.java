package com.frontalsneakers.api.service.impl;

import com.frontalsneakers.api.exception.BusinessLogicException;
import com.frontalsneakers.api.exception.ResourceNotFoundException;
import com.frontalsneakers.api.model.*;
import com.frontalsneakers.api.repository.EnderecoRepository;
import com.frontalsneakers.api.repository.PedidoRepository;
import com.frontalsneakers.api.repository.VariacaoProdutoRepository;
import com.frontalsneakers.api.service.CarrinhoService;
import com.frontalsneakers.api.service.PedidoService;
import com.frontalsneakers.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoServiceImpl implements PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private CarrinhoService carrinhoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private VariacaoProdutoRepository variacaoProdutoRepository;

    @Override
    public List<Pedido> findByUsuarioId(Long usuarioId) {
        Usuario usuario = usuarioService.findById(usuarioId);
        return pedidoRepository.findByUsuario(usuario);
    }

    @Override
    public Pedido findById(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado: " + id));
    }

    @Override
    @Transactional
    public Pedido createPedido(Long usuarioId, Long enderecoEntregaId) {
        // Obter os dados necessários
        Carrinho carrinho = carrinhoService.getCarrinhoByUsuarioId(usuarioId);
        Usuario usuario = usuarioService.findById(usuarioId);
        Endereco endereco = enderecoRepository.findById(enderecoEntregaId)
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado: " + enderecoEntregaId));

        // REGRAS DE NEGÓCIO (Validação)
        if (carrinho.getItens().isEmpty()) {
            throw new BusinessLogicException("Não é possível criar um pedido com o carrinho vazio.");
        }

        if (!endereco.getUsuario().getId().equals(usuarioId)) {
            throw new BusinessLogicException("O endereço de entrega não pertence ao usuário.");
        }

        // Criar o Pedido "pai"
        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setEnderecoEntrega(endereco);
        pedido.setDataPedido(LocalDateTime.now());
        pedido.setStatus(StatusPedido.PENDENTE);
        pedido.setItens(new ArrayList<>());

        BigDecimal totalPedido = BigDecimal.ZERO;

        // Transformar Itens do Carrinho em Itens de Pedido
        for (ItemCarrinho itemCarrinho : carrinho.getItens()) {
            VariacaoProduto variacao = itemCarrinho.getVariacaoProduto();

            // REGRAS DE NEGÓCIO (Estoque) - Check duplo (importante em concorrência)
            if (variacao.getQuantidadeEstoque() < itemCarrinho.getQuantidade()) {
                throw new BusinessLogicException("Estoque insuficiente para o produto: " + variacao.getSku());
            }

            // Dar baixa no estoque
            variacao.setQuantidadeEstoque(variacao.getQuantidadeEstoque() - itemCarrinho.getQuantidade());
            variacaoProdutoRepository.save(variacao); // Salva a baixa no estoque

            // Criar o novo ItemPedido
            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setPedido(pedido);
            itemPedido.setVariacaoProduto(variacao);
            itemPedido.setQuantidade(itemCarrinho.getQuantidade());
            itemPedido.setPrecoNoMomento(variacao.getPreco());

            pedido.getItens().add(itemPedido);

            // Calcular o total
            totalPedido = totalPedido.add(
                    itemPedido.getPrecoNoMomento().multiply(BigDecimal.valueOf(itemPedido.getQuantidade()))
            );
        }

        pedido.setTotal(totalPedido);

        // Salvar o Pedido (o Cascade salvará os ItensPedido)
        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        // Limpar o carrinho
        carrinhoService.limparCarrinho(usuarioId);

        return pedidoSalvo;
    }
}
