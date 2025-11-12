package com.frontalsneakers.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "variacoes_produto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VariacaoProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String cor;

    @Column(nullable = false)
    private String tamanho;

    @Column(nullable = false)
    private BigDecimal preco; // Correto usar BigDecimal para dinheiro

    @Column(nullable = false)
    private Integer quantidadeEstoque;

    @ElementCollection // Para listas de tipos básicos (String)
    @CollectionTable(name = "variacao_imagens", joinColumns = @JoinColumn(name = "variacao_id"))
    @Column(name = "imagem_url")
    private List<String> imagens;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false) // Esta é a "dona" da relação
    private Produto produto;
}
