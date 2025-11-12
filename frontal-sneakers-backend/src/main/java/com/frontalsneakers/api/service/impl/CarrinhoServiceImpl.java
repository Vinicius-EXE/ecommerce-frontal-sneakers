package com.frontalsneakers.api.service.impl;

import com.frontalsneakers.api.exception.BusinessLogicException;
import com.frontalsneakers.api.exception.ResourceNotFoundException;
import com.frontalsneakers.api.model.Carrinho;
import com.frontalsneakers.api.model.ItemCarrinho;
import com.frontalsneakers.api.model.Usuario;
import com.frontalsneakers.api.model.VariacaoProduto;
import com.frontalsneakers.api.repository.CarrinhoRepository;
import com.frontalsneakers.api.repository.VariacaoProdutoRepository;
import com.frontalsneakers.api.service.CarrinhoService;
import com.frontalsneakers.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CarrinhoServiceImpl implements CarrinhoService {
    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private VariacaoProdutoRepository variacaoProdutoRepository;

    @Override
    @Transactional(readOnly = true)
    public Carrinho getCarrinhoByUsuarioId(Long usuarioId) {
        Usuario usuario = usuarioService.findById(usuarioId);
        return carrinhoRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado para o usuário: " + usuarioId));
    }

    @Override
    @Transactional
    public Carrinho addItemAoCarrinho(Long usuarioId, Long variacaoProdutoId, int quantidade) {
        Carrinho carrinho = getCarrinhoByUsuarioId(usuarioId);

        VariacaoProduto variacao = variacaoProdutoRepository.findById(variacaoProdutoId)
                .orElseThrow(() -> new ResourceNotFoundException("Variação de produto não encontrada: " + variacaoProdutoId));

        if (variacao.getQuantidadeEstoque() < quantidade) {
            throw new BusinessLogicException("Estoque insuficiente. Disponível: " + variacao.getQuantidadeEstoque());
        }

        // REGRA DE NEGÓCIO: Se o item já está no carrinho, apenas soma a quantidade
        Optional<ItemCarrinho> itemExistente = carrinho.getItens().stream()
                .filter(item -> item.getVariacaoProduto().getId().equals(variacaoProdutoId))
                .findFirst();

        if (itemExistente.isPresent()) {
            ItemCarrinho item = itemExistente.get();
            item.setQuantidade(item.getQuantidade() + quantidade);
        } else {
            ItemCarrinho novoItem = new ItemCarrinho();
            novoItem.setCarrinho(carrinho);
            novoItem.setVariacaoProduto(variacao);
            novoItem.setQuantidade(quantidade);
            carrinho.getItens().add(novoItem);
        }

        return carrinhoRepository.save(carrinho);
    }

    @Override
    @Transactional
    public Carrinho removeItemDoCarrinho(Long usuarioId, Long itemCarrinhoId) {
        Carrinho carrinho = getCarrinhoByUsuarioId(usuarioId);

        // A mágica do `orphanRemoval = true` na entidade Carrinho:
        // Ao remover o item da lista e salvar o "pai" (Carrinho),
        // o JPA entende que deve apagar o ItemCarrinho do banco.
        boolean removed = carrinho.getItens()
                .removeIf(item -> item.getId().equals(itemCarrinhoId) && item.getCarrinho().getId().equals(carrinho.getId()));

        if (!removed) {
            throw new ResourceNotFoundException("Item de carrinho não encontrado: " + itemCarrinhoId);
        }

        return carrinhoRepository.save(carrinho);
    }

    @Override
    @Transactional
    public void limparCarrinho(Long usuarioId) {
        Carrinho carrinho = getCarrinhoByUsuarioId(usuarioId);
        carrinho.getItens().clear(); // Novamente, `orphanRemoval = true` faz a mágica
        carrinhoRepository.save(carrinho);
    }
}
