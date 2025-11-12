package com.frontalsneakers.api.service.impl;

import com.frontalsneakers.api.exception.ResourceNotFoundException;
import com.frontalsneakers.api.model.Produto;
import com.frontalsneakers.api.model.VariacaoProduto;
import com.frontalsneakers.api.repository.VariacaoProdutoRepository;
import com.frontalsneakers.api.service.ProdutoService;
import com.frontalsneakers.api.service.VariacaoProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VariacaoProdutoServiceImpl implements VariacaoProdutoService {

    @Autowired
    private VariacaoProdutoRepository variacaoProdutoRepository;

    @Autowired
    private ProdutoService produtoService;

    @Override
    @Transactional(readOnly = true)
    public List<VariacaoProduto> findByProdutoId(Long produtoId) {
        Produto produto = produtoService.findById(produtoId);
        return produto.getVariacoes();
    }

    @Override
    public VariacaoProduto findById(Long id) {
        return variacaoProdutoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Variação de Produto não encontrada com id: " + id));
    }

    @Override
    @Transactional
    public VariacaoProduto create(Long produtoId, VariacaoProduto variacao) {
        // Busca o Produto "pai"
        Produto produto = produtoService.findById(produtoId);

        // Associa a nova variação ao pai
        variacao.setProduto(produto);

        // Salva a nova variação
        return variacaoProdutoRepository.save(variacao);
    }

    @Override
    @Transactional
    public VariacaoProduto update(Long id, VariacaoProduto variacaoDetails) {
        VariacaoProduto variacao = findById(id);

        variacao.setSku(variacaoDetails.getSku());
        variacao.setCor(variacaoDetails.getCor());
        variacao.setTamanho(variacaoDetails.getTamanho());
        variacao.setPreco(variacaoDetails.getPreco());
        variacao.setQuantidadeEstoque(variacaoDetails.getQuantidadeEstoque());
        variacao.setImagens(variacaoDetails.getImagens());

        return variacaoProdutoRepository.save(variacao);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        VariacaoProduto variacao = findById(id);
        variacaoProdutoRepository.delete(variacao);
    }
}
